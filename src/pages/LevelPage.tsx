import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress, LinearProgress } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchRequestQuestion, RequestQuestion } from '../services/requestQuestionService'; 
import { createUserLevelProgress } from '../services/UserLevelProgressService';
import { fetchLevelById } from '../services/levelService';
import WebFont from 'webfontloader';

const LevelPage: React.FC = () => {
  const { id } = useParams();
  const [questionData, setQuestionData] = useState<RequestQuestion | null>(null);
  const [answers, setAnswers] = useState<number[]>([0, 1, 2, 3]); 
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [heartbeat, setHeartbeat] = useState<boolean>(false);
  const [questionLoaded, setQuestionLoaded] = useState<boolean>(false);
  const [difficulty, setDifficulty] = useState<string>('EASY');
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [dialogMessage, setDialogMessage] = useState<string>('');
  const [isPaused, setIsPaused] = useState<boolean>(false); // New state to control timer
  const navigate = useNavigate();

  useEffect(() => {

    WebFont.load({
      google: {
        families: ['DynaPuff:400,700', 'sans-serif'],
      },
    });

    loadLevelDetails();
  }, []);

  const loadLevelDetails = async () => {
    try {
      const levelDetails = await fetchLevelById(Number(id));
      setDifficulty(levelDetails.difficulty);
      setTimeLeft(getTimeByDifficulty(levelDetails.difficulty));
      loadQuestion(levelDetails.difficulty);
    } catch (error) {
      console.error('Error fetching level details:', error);
    }
  };

  const getTimeByDifficulty = (difficulty: string) => {
    switch (difficulty) {
      case 'EASY':
        return 20;
      case 'MID':
        return 15;
      case 'HARD':
        return 10;
      case 'EPILOGUE':
        return 6;
      default:
        return 20;
    }
  };

  useEffect(() => {
    if (questionLoaded && timeLeft > 0 && !isPaused) { // Check isPaused
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      if (timeLeft <= 5) {
        setHeartbeat(true);
      } else {
        setHeartbeat(false);
      }

      return () => clearInterval(timer);
    }

    if (questionLoaded && timeLeft === 0 && !isPaused) {
      setDialogMessage('Time is Up!!');
      setOpenDialog(true);
      setIsPaused(true); // Pause timer on time up
    }
  }, [timeLeft, questionLoaded, isPaused]);

  const loadQuestion = async (difficulty: string) => {
    try {
      const data = await fetchRequestQuestion();
      setQuestionData(data);
      setCorrectAnswer(data.solution);
      generateAnswers(data.solution, difficulty);
      setQuestionLoaded(true);
    } catch (error) {
      console.error('Error loading question:', error);
    }
  };

  const generateAnswers = (solution: number, difficulty: string) => {
    const answerCount = getAnswerCountByDifficulty(difficulty);
    const randomAnswers = new Set<number>();
    randomAnswers.add(solution);

    while (randomAnswers.size < answerCount) {
      const randomNumber = Math.floor(Math.random() * 10);
      randomAnswers.add(randomNumber);
    }

    setAnswers(Array.from(randomAnswers).sort(() => Math.random() - 0.5));
  };

  const handleAnswerClick = async (answer: number) => {
    setIsPaused(true); // Pause timer on answer click
    if (answer === correctAnswer) {
      await sendProgressData();
      setDialogMessage("Congrats! You finished the level.");
    } else {
      setDialogMessage("Oops! Wrong answer.");
    }
    setOpenDialog(true);
  };

  const sendProgressData = async () => {
    const userId = sessionStorage.getItem('userId');
    const levelId = Number(id);
    const timeTaken = getTimeByDifficulty(difficulty) - timeLeft;

    const progressData = {
      marks: timeLeft,
      timeInSeconds: timeTaken,
      user: { id: Number(userId) },
      level: { id: levelId },
    };

    try {
      await createUserLevelProgress(progressData);
    } catch (error) {
      console.error('Error sending progress data:', error);
    }
  };

  const handleRetry = () => {
    setOpenDialog(false);
    setHeartbeat(false);
    setIsPaused(false); // Resume timer on retry
    setTimeLeft(getTimeByDifficulty(difficulty));
    loadQuestion(difficulty);
  };

  const handleMainMenu = () => {
    navigate('/dashboard');
  };

  const handlePlayAgain = () => {
    navigate('/play');
  };

  const getAnswerCountByDifficulty = (difficulty: string) => {
    switch (difficulty) {
      case 'EASY':
        return 4;
      case 'MID':
        return 5;
      case 'HARD':
        return 6;
      case 'EPILOGUE':
        return 6;
      default:
        return 4;
    }
  };

  if (!questionData) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundImage: `url(./images/background.png)`,
        backgroundColor: '#E3F9A6',
        zIndex: 2,
        outline: '4px solid #C69C6D', // Light brown outline
        borderRadius: '25px',
        padding: '20px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          width : '100%',
          position: 'relative',
          overflow: 'hidden',
          background: timeLeft <= 5 && !isPaused
            ? `radial-gradient(circle at center, rgba(255, 255, 255, 0) 60%, rgba(255, 0, 0, 0.6) 100%)`
            : 'none',
          animation: heartbeat && !isPaused ? 'panicEffect 1.0s infinite' : 'none',
          '@keyframes panicEffect': {
            '0%': { opacity: 0.8 },
            '50%': { opacity: 1 },
            '100%': { opacity: 0.8 },
          },
        }}
      >

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          textAlign: 'center',
          backgroundColor: 'rgba(255, 242, 117, 0.7)', // Banana yellow theme
          padding: '30px',
          borderRadius: '20px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0px 0px 20px rgba(255, 195, 0, 0.6)', // Soft yellow glow
          width: '60%',
          //maxWidth: '1200px',
          //width: '900px',
          height: '70%',
          backgroundImage: `url(https://cdn.discordapp.com/attachments/752791123155615775/1303668324558704691/wood.webp?ex=674f86fd&is=674e357d&hm=e646220ab5c6ffcd5060d55df3852cc5f31d5a6b8cc8fb745e8614f9638490b5&)`,
          border: '10px solid #6D4C41',
        }}
      >

     <Button
      onClick={() => handleMainMenu()}
        sx={{
          position: 'absolute',
          right: '1%',
          bottom: '84%',
          height: '14%',
          width: '14%',
          background: 'url(https://cdn.discordapp.com/attachments/752791123155615775/1307357277547659347/woden_home_button.png?ex=674fc398&is=674e7218&hm=1d468c91cd82b828a78b7b0f03aefc501ea560c1dbb5c17ff2f507eefadc0924&) no-repeat left bottom',
          backgroundSize: 'contain',
          // animation: 'moveUpDown 2s infinite alternate',
          // '@keyframes moveUpDown': {
          //   '0%': { transform: 'translateY(0)' },
          //   '100%': { transform: 'translateY(-12px)' },
          // },
        }}
      />

    <Button
      onClick={() => handleRetry()}
        sx={{
          position: 'absolute',
          left: '1%',
          bottom: '84%',
          height: '14%',
          width: '14%',
          background: 'url(https://cdn.discordapp.com/attachments/752791123155615775/1303667886748860416/wood_reload_button.png?ex=674f8695&is=674e3515&hm=db442fbf67a6ac313c1d745012f2a6009a253490c8588cb7f9b072deb7ddbcac&) no-repeat left bottom',
          backgroundSize: 'contain',
          // animation: 'moveUpDown 2s infinite alternate',
          // '@keyframes moveUpDown': {
          //   '0%': { transform: 'translateY(0)' },
          //   '100%': { transform: 'translateY(-12px)' },
          // },
        }}
      />

        <Typography
          variant="h4"
          sx={{
            marginBottom: '20px',
            zIndex: 1,
            fontSize: timeLeft <= 5 ? '2.5rem' : '2rem',
            color: timeLeft <= 5 ? '#FF0000' : 'white',
            animation: timeLeft <= 5 ? 'pulse 0.5s infinite' : 'none',
            '@keyframes pulse': {
              '0%': { transform: 'scale(1)' },
              '50%': { transform: 'scale(1.1)' },
              '100%': { transform: 'scale(1)' },
            },
          }}
        >
          Time Left: {timeLeft}s
        </Typography>

        <Box sx={{ width: '80%', margin: '20px 0' }}>
          <LinearProgress
            variant="determinate"
            value={(timeLeft / getTimeByDifficulty(difficulty)) * 100}
            sx={{
              height: '10px',
              backgroundColor: '#ccc',
              '& .MuiLinearProgress-bar': {
                backgroundColor: timeLeft <= 5 ? '#FF0000' : '#8D6E63',
                transition: 'background-color 0.5s ease',
              },
            }}
          />
        </Box>

        <Box
          sx={{
            backgroundImage: `url(${questionData.question})`,
            backgroundSize: 'contain',      // Ensures the full image is visible within the box
            backgroundPosition: 'center',    // Centers the image within the box
            backgroundRepeat: 'no-repeat',   // Prevents the image from repeating
            width: '100vh',                   // Adjust width and height as needed to ensure visibility
            height: '100vh',                 // Makes the box full screen height to fit the image fully
            borderRadius: '10px',
            //boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
            zIndex: 1,
          }}
        />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '80%', marginTop: '20px', zIndex: 1 }}>
          {answers.map(answer => (
            <Button
              key={answer}
              variant="contained"
              onClick={() => handleAnswerClick(answer)}
              sx={{
                backgroundColor: 'transparent',
                color: 'white',
                padding: '0', 
                minWidth: '100px', // Set a minimum width
                height: '100px', // Keep height for square shape
                fontSize: '18px',
                fontWeight: 'bold',
                textAlign: 'center',
                fontFamily: 'DynaPuff, sans-serif', 
                 '&:hover': { 
                backgroundColor: 'transparent', 
                transform: 'scale(1.05)',
                transition: 'transform 0.2s ease-in-out'
              },
              //boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundImage: `url(https://cdn.discordapp.com/attachments/752791123155615775/1303668435741573200/normal_button.png?ex=674f8718&is=674e3598&hm=03e613d368553b409c3124a269dc6d06406e0cecbae591f719f33ad1e9c4d72c&)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              }}
            >
              {answer}
            </Button>
          ))}
          </Box>
        </Box>

        {/* Dialog for time up, wrong answer, or correct answer */}
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          PaperProps={{
            style: {
              backgroundImage: `url(https://cdn.discordapp.com/attachments/752791123155615775/1307344272135028766/wood1.jpeg?ex=674fb77b&is=674e65fb&hm=4a19ab3ac9da2fe9f302f511569bea5272858f054275370eb86f62b93fa727fe&)`,
              backgroundSize: 'cover',
              backgroundColor: '#FFEB3B',
              padding: '20px',
              borderRadius: '10px',
              fontFamily: 'DynaPuff, sans-serif',
              fontWeight: 'bold',
            },
          }}
        >
          <DialogTitle sx={{ fontFamily: 'DynaPuff, sans-serif', fontWeight: 'bold',
            color:dialogMessage === 'Time is Up!!' || dialogMessage === 'Oops! Wrong answer.' || dialogMessage === 'Congrats! You finished the level.'? 'white' : 'black',
           }}>{dialogMessage}</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ fontFamily: 'DynaPuff, sans-serif', fontWeight: 'bold', color: 'white' }}>
              {dialogMessage === 'Congrats! You finished the level.'
                ? 'Well done! Click to proceed to the next level.'
                : 'Do you want to retry or go back to the main menu?'}
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center' }}>
            {dialogMessage === 'Congrats! You finished the level.' ? (
              <Button
                onClick={handlePlayAgain}
                sx={{
                  backgroundColor: '#8D6E63',
                  color: 'white',
                  fontFamily: 'DynaPuff, sans-serif',
                  fontWeight: 'bold',
                  '&:hover': { backgroundColor: '#7B5B42' },
                }}
              >
                Play Again
              </Button>
            ) : (
              <>
                <Button
                  onClick={handleRetry}
                  sx={{
                    backgroundColor: 'yellow',
                    color: 'black',
                    fontFamily: 'DynaPuff, sans-serif',
                    fontWeight: 'bold',
                    '&:hover': { backgroundColor: '#7B5B42' },
                  }}
                >
                  Try Again
                </Button>
                <Button
                  onClick={handleMainMenu}
                  sx={{
                    backgroundColor: 'yellow',
                    color: 'black',
                    fontFamily: 'DynaPuff, sans-serif',
                    fontWeight: 'bold',
                    '&:hover': { backgroundColor: '#7B5B42' },
                  }}
                >
                  Main Menu
                </Button>
              </>
            )}
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default LevelPage;
