import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Alert, Snackbar } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchRequestQuestion, RequestQuestion } from '../services/requestQuestionService';
import { fetchLevelById, Level } from '../services/levelService'; // Import the fetchLevelById function
import { createUserLevelProgress } from '../services/UserLevelProgressService';


const LevelPage: React.FC = () => {
  const { id } = useParams(); // Get level ID from URL
  const [questionData, setQuestionData] = useState<RequestQuestion | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [heartbeat, setHeartbeat] = useState<boolean>(false);
  const [levelDetails, setLevelDetails] = useState<Level | null>(null); // Store level details
  const [questionLoaded, setQuestionLoaded] = useState<boolean>(false);
  const navigate = useNavigate();

  // Get the countdown time based on difficulty
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

  // Get the number of answer choices based on difficulty
  const getAnswerCountByDifficulty = (difficulty: string) => {
    switch (difficulty) {
      case 'EASY':
        return 4;
      case 'MID':
        return 5;
      case 'HARD':
      case 'EPILOGUE':
        return 6;
      default:
        return 4;
    }
  };

  // Fetch level details by ID
  useEffect(() => {
    const loadLevelDetails = async () => {
      try {
        const level = await fetchLevelById(Number(id)); // Fetch the level by ID
        setLevelDetails(level);
        setTimeLeft(getTimeByDifficulty(level.difficulty)); // Set timer based on difficulty
        loadQuestion(); // Load the question after fetching the level details
      } catch (error) {
        console.error('Error fetching level details:', error);
      }
    };

    loadLevelDetails();
  }, [id]);

  // Fetch the question
  const loadQuestion = async () => {
    try {
      const data = await fetchRequestQuestion();
      setQuestionData(data);
      setCorrectAnswer(data.solution);
      generateAnswers(data.solution); // Generate answer options
      setQuestionLoaded(true); // Mark question as loaded
    } catch (error) {
      console.error('Error loading question:', error);
    }
  };

  // Generate answer choices
  const generateAnswers = (solution: number) => {
    if (levelDetails) {
      const answerCount = getAnswerCountByDifficulty(levelDetails.difficulty); // Get answer count based on difficulty
      const randomAnswers = new Set<number>();
      randomAnswers.add(solution);

      while (randomAnswers.size < answerCount) {
        const randomNumber = Math.floor(Math.random() * 10); // Adjust range if needed
        randomAnswers.add(randomNumber);
      }

      setAnswers(Array.from(randomAnswers).sort(() => Math.random() - 0.5)); // Shuffle answers
    }
  };

  // Handle timer countdown
  useEffect(() => {
    if (questionLoaded && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      if (timeLeft <= 5) {
        setHeartbeat(true); // Trigger heartbeat effect when 5 seconds are left
      }

      return () => clearInterval(timer);
    }

    if (questionLoaded && timeLeft === 0) {
      alert('Time is up!');
    }
  }, [timeLeft, questionLoaded]);

  // Handle answer selection
  const handleAnswerClick = async (answer: number) => {
    if (answer === correctAnswer) {
      await sendProgressData();
      alert('Correct! 🎉');
    } else {
      setOpenSnackbar(true);
    }
  };

  const sendProgressData = async () => {
    const userId = 1;
    const levelId = Number(id);
    const timeTaken = levelDetails ? getTimeByDifficulty(levelDetails.difficulty) - timeLeft : 0;

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

  const handleTryAgain = () => {
    setOpenSnackbar(false);
    loadQuestion(); // Reload question
  };

  const handleMainMenu = () => {
    navigate('/dashboard');
  };

  if (!levelDetails || !questionData) {
    return <div>Loading...</div>; // Show loading until the level and question are fetched
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#E3F9A6',
        animation: heartbeat ? 'heartbeat 1s infinite' : 'none',
        '@keyframes heartbeat': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>
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
        }}
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '80%', marginTop: '20px' }}>
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

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="error">
          Wrong answer! Try again.
        </Alert>
      </Snackbar>

      <Box sx={{ marginTop: '20px' }}>
        <Button variant="outlined" onClick={handleTryAgain} sx={{ marginRight: '10px' }}>
          Try Again
        </Button>
        <Button variant="outlined" onClick={handleMainMenu}>
          Main Menu
        </Button>
      </Box>
    </Box>
  );
};

export default LevelPage;
