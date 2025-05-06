import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Leaderboard from './components/Leaderboard';
import Multiplayer from './pages/Multiplayer';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/multiplayer" element={<Multiplayer />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

