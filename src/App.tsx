import React , {useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import LevelSelection from './pages/LevelSelection';
import LevelPage from './pages/LevelPage';
import LeaderBoard from './pages/LeaderBoard';
import RegisterPage from './pages/RegisterPage';
import PasswordResetPage from './pages/PasswordResetPage';
import UpdateProfilePage from './pages/UpdateProfilePage';
import NotFoundPage from './pages/NotFoundPage';

const App: React.FC = () => {

  useEffect(() => {
    document.title = "The Golden Banana";
  }, []);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/password-reset" element={<PasswordResetPage />} />
        <Route path="/profile" element={<UpdateProfilePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/play" element={<LevelSelection />} />
        <Route path="/level/:id" element={<LevelPage />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path="*" element={<NotFoundPage />} /> {/* Fallback route */}
      </Routes>
    </Router>
  );
}

export default App;
