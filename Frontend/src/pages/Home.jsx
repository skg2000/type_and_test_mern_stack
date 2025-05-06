import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import TypingTest from '../components/TypingTest';
import Leaderboard from '../components/Leaderboard';

const Home = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      {user ? (
        <>
          <h1>Welcome, {user.email}</h1>
          <button onClick={handleLogout}>Logout</button>
          <TypingTest />
          <Leaderboard />
        </>
      ) : (
        <>
          <h1>Please log in to use the app</h1>
          <button onClick={() => navigate('/login')}>Login</button>
          <button onClick={() => navigate('/signup')}>Sign Up</button>
        </>
      )}
    </div>
  );
};

export default Home;
