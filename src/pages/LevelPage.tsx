import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Alert, Snackbar } from '@mui/material';
import { useNavigate  } from 'react-router-dom';
import { fetchRequestQuestion, RequestQuestion } from '../services/requestQuestionService'; // Ensure to adjust the import path

const LevelPage: React.FC = () => {
  const [questionData, setQuestionData] = useState<RequestQuestion | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadQuestion();
  }, []);

  const loadQuestion = async () => {
    try {
      const data = await fetchRequestQuestion();
      setQuestionData(data);
      setCorrectAnswer(data.solution);
      generateAnswers(data.solution);
    } catch (error) {
      console.error('Error loading question:', error);
    }
  };

  const generateAnswers = (solution: number) => {
    const randomAnswers = new Set<number>();
    randomAnswers.add(solution); // Add the correct answer

    // Generate 3 random incorrect answers
    while (randomAnswers.size < 4) {
      const randomNumber = Math.floor(Math.random() * 10); // Adjust range as needed
      randomAnswers.add(randomNumber);
    }

    setAnswers(Array.from(randomAnswers).sort(() => Math.random() - 0.5)); // Shuffle answers
  };

  const handleAnswerClick = (answer: number) => {
    if (answer === correctAnswer) {
      alert("Correct! 🎉"); // You can handle correct answer case here
    } else {
      setOpenSnackbar(true); // Open alert for incorrect answer
    }
  };

  const handleTryAgain = () => {
    setOpenSnackbar(false);
    loadQuestion(); // Reload question
  };

  const handleMainMenu = () => {
    navigate('/dashboard'); // Redirect to dashboard
  };

  if (!questionData) {
    return <div>Loading...</div>; // Handle loading state
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
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>
        Select the correct answer
      </Typography>
      <Box
        sx={{
          backgroundImage: `url(${questionData.question})`,
          backgroundSize: 'cover',
          width: '300px', // Adjust size as needed
          height: '200px', // Adjust size as needed
          borderRadius: '10px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
          position: 'relative',
        }}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '80%',
          marginTop: '20px',
        }}
      >
        {answers.map(answer => (
          <Button
            key={answer}
            variant="contained"
            onClick={() => handleAnswerClick(answer)}
            sx={{
              backgroundColor: '#8D6E63', // Wood-like color
              color: 'white',
              padding: '10px 20px',
              '&:hover': { backgroundColor: '#7B5B42' }, // Darker on hover
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