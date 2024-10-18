import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchRequestQuestion, RequestQuestion } from '../services/requestQuestionService'; 
import { createUserLevelProgress } from '../services/UserLevelProgressService';
import { fetchLevelById } from '../services/levelService';

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
  const navigate = useNavigate();

  useEffect(() => {
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
    if (questionLoaded && timeLeft > 0) {
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

    if (questionLoaded && timeLeft === 0) {
      setDialogMessage('Time is Up!!');
      setOpenDialog(true);
    }
  }, [timeLeft, questionLoaded]);

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
    if (answer === correctAnswer) {
      await sendProgressData();
      setDialogMessage("Congrats! You finished the level.");
      setOpenDialog(true);
    } else {
      setDialogMessage("Oops! Wrong answer.");
      setOpenDialog(true);
    }
  };

  const sendProgressData = async () => {
    const userId = 1;
    const levelId = Number(id);
    const timeTaken = getTimeByDifficulty(difficulty) - timeLeft;

    const progressData = {
      marks: 10,
      timeInSeconds: timeTaken,
      user: { id: userId },
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
    return <div>Loading...</div>;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: timeLeft <= 5
          ? `radial-gradient(circle at center, rgba(255, 255, 255, 0) 60%, rgba(255, 0, 0, 0.6) 100%)`
          : 'none',
        animation: heartbeat ? 'panicEffect 1.0s infinite' : 'none',
        '@keyframes panicEffect': {
          '0%': { opacity: 0.8 },
          '50%': { opacity: 1 },
          '100%': { opacity: 0.8 },
        },
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: '20px', zIndex: 1 }}>
        Time Left: {timeLeft}s
      </Typography>

      <Box
        sx={{
          backgroundImage: `url(${questionData.question})`,
          backgroundSize: 'cover',
          width: '300px',
          height: '200px',
          borderRadius: '10px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
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
              backgroundColor: '#8D6E63',
              color: 'white',
              padding: '10px 20px',
              '&:hover': { backgroundColor: '#7B5B42' },
            }}
          >
            {answer}
          </Button>
        ))}
      </Box>

      {/* Dialog for time up, wrong answer, or correct answer */}
      <Dialog
  open={openDialog}
  onClose={() => setOpenDialog(false)}
  PaperProps={{
    style: {
      backgroundColor: 'yellow', // Set yellow background
      padding: '20px',
      borderRadius: '10px',
    },
  }}
>
  <DialogTitle>{dialogMessage}</DialogTitle>
  <DialogContent>
    <DialogContentText>
      {dialogMessage === 'Congrats! You finished the level.'
        ? 'Well done! Click to proceed to the next level.'
        : 'Do you want to retry or go back to the main menu?'}
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    {dialogMessage === 'Congrats! You finished the level.' ? (
      <Button
        onClick={handlePlayAgain}
        sx={{
          backgroundColor: '#8D6E63', // Brown button
          color: 'white',
          '&:hover': { backgroundColor: '#7B5B42' }, // Darker brown on hover
        }}
      >
        Play Again
      </Button>
    ) : (
      <>
        <Button
          onClick={handleRetry}
          sx={{
            backgroundColor: '#8D6E63', // Brown button
            color: 'white',
            '&:hover': { backgroundColor: '#7B5B42' }, // Darker brown on hover
          }}
        >
          Try Again
        </Button>
        <Button
          onClick={handleMainMenu}
          sx={{
            backgroundColor: '#8D6E63', // Brown button
            color: 'white',
            '&:hover': { backgroundColor: '#7B5B42' }, // Darker brown on hover
          }}
        >
          Main Menu
        </Button>
      </>
    )}
  </DialogActions>
</Dialog>

    </Box>
  );
};

export default LevelPage;
