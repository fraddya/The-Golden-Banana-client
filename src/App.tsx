import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import LevelSelection from './pages/LevelSelection';
import LevelPage from './pages/LevelPage';
import LeaderBoard from './pages/LeaderBoard';

const App: React.FC = () => {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/play" element={<LevelSelection />} />
        <Route path="/level/:id" element={<LevelPage />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
      </Routes>
    </Router>
  );
}

export default App;
