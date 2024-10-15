import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, CircularProgress } from '@mui/material';
import { fetchLevelSuggestions, Level } from '../services/levelService'; // Assuming your service layer is in api.ts
import { useNavigate } from 'react-router-dom';

const LevelSelection: React.FC = () => {
  const [levels, setLevels] = useState<Level[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleLevelClick = (level: Level) => {
    navigate(`/level/${level.id}`); // Redirect to the new level page
  };

  useEffect(() => {
    const fetchAllLevels = async () => {
      try {
        const levelData = await fetchLevelSuggestions(); // Using the updated service call
        setLevels(levelData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching levels:', error);
      }
    };
    fetchAllLevels();
  }, []);

  const renderLevelsByDifficulty = (difficulty: string) => {
    return levels
      .filter(level => level.difficulty === difficulty)
      .map(level => (
        <Grid
          item
          xs={12} sm={6} md={4}
          key={level.id}
          sx={{
            display: 'flex',
            justifyContent: 'center', // Center horizontally
          }}
        >
          <Button
          onClick={() => handleLevelClick(level)}
            sx={{
              backgroundColor: '#FFD600', // Banana yellow for buttons
              color: '#6D4C41', // Brown text
              padding: '0', // Remove default padding
              minWidth: '100px', // Set a minimum width
              height: '100px', // Keep height for square shape
              borderRadius: '10px', // Keep border radius
              border: '2px solid #6D4C41', // Add border with brown color
              fontSize: '16px',
              fontWeight: 'bold',
              textAlign: 'center', // Ensure text is centered
              '&:hover': { backgroundColor: '#FFEB3B' },
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)', // Button shadow
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {level.name}
          </Button>
        </Grid>
      ));
  };

  if (loading) {
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
        height: '100vh',
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
          height: 'auto',
        }}
      >

        <Box
        sx={{
          //display: 'flex',
          //flexDirection: 'column',
          textAlign: 'center',
          backgroundColor: 'rgba(255, 242, 117, 0.7)', // Banana yellow theme
          padding: '30px',
          borderRadius: '20px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0px 0px 20px rgba(255, 195, 0, 0.6)', // Soft yellow glow
          width: '70%',
          maxWidth: '1200px',
          height: 'auto',
        }}
      >

        <Typography
          variant="h2"
          sx={{ color: '#6D4C41', fontWeight: 'bold', marginBottom: '20px', fontFamily: 'Comic Sans MS' }}
        >
          🍌 Select Your Level 🍌
        </Typography>

        <Box
        sx={{
          //display: 'flex',
          //flexDirection: 'column',
          textAlign: 'center',
          backgroundColor: 'rgba(255, 242, 117, 0.7)', // Banana yellow theme
          padding: '30px',
          borderRadius: '20px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0px 0px 20px rgba(255, 195, 0, 0.6)', // Soft yellow glow
          width: 'auto',
          maxWidth: '1200px',
        }}
      >

        {/* Easy Levels */}
        <Typography variant="h4" sx={{ color: '#6D4C41', fontWeight: 'bold', marginBottom: '10px' , paddingBottom: '20px'}}>
          Easy Levels 🍃
        </Typography>
        <Grid container spacing={2}>
          {renderLevelsByDifficulty('EASY')}
        </Grid>

        </Box>

        <Box
        sx={{
          //display: 'flex',
          //flexDirection: 'column',
          textAlign: 'center',
          backgroundColor: 'rgba(255, 242, 117, 0.7)', // Banana yellow theme
          padding: '30px',
          borderRadius: '20px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0px 0px 20px rgba(255, 195, 0, 0.6)', // Soft yellow glow
          width: 'auto',
          maxWidth: '1200px',
        }}
      >

        {/* Medium Levels */}
        <Typography variant="h4" sx={{ color: '#6D4C41', fontWeight: 'bold', marginTop: '20px', marginBottom: '10px' , paddingBottom: '20px' }}>
          Mid Levels 🍇
        </Typography>
        <Grid container spacing={2}>
          {renderLevelsByDifficulty('MID')}
        </Grid>
        </Box>

        <Box
        sx={{
          //display: 'flex',
          //flexDirection: 'column',
          textAlign: 'center',
          backgroundColor: 'rgba(255, 242, 117, 0.7)', // Banana yellow theme
          padding: '30px',
          borderRadius: '20px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0px 0px 20px rgba(255, 195, 0, 0.6)', // Soft yellow glow
          width: 'auto',
          maxWidth: '1200px',
        }}
      >

        {/* Hard Levels */}
        <Typography variant="h4" sx={{ color: '#6D4C41', fontWeight: 'bold', marginTop: '20px', marginBottom: '10px' , paddingBottom: '20px' }}>
          Hard Levels 🔥
        </Typography>
        <Grid container spacing={2}>
          {renderLevelsByDifficulty('HARD')}
        </Grid>

        </Box>

        <Box
        sx={{
          //display: 'flex',
          //flexDirection: 'column',
          textAlign: 'center',
          backgroundColor: 'rgba(255, 242, 117, 0.7)', // Banana yellow theme
          padding: '30px',
          borderRadius: '20px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0px 0px 20px rgba(255, 195, 0, 0.6)', // Soft yellow glow
          width: 'auto',
          maxWidth: '1200px',
        }}
      >

        {/* Epilogue Levels */}
        <Typography variant="h4" sx={{ color: '#6D4C41', fontWeight: 'bold', marginTop: '20px', marginBottom: '10px', paddingBottom: '20px' }}>
          Epilogue 🌴
        </Typography>
        <Grid container spacing={2}>
          {renderLevelsByDifficulty('EPILOGUE')}
        </Grid>
        </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LevelSelection;
