import { useAuth } from './providers/AuthProvider';
import './styling/navbar.css';
import { useNavigate } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_BASE_API;

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const openProfile = () => {
    console.log('opening profile');
  }

  const queryLogin = async () => {
    console.log('Queueing login...');

    try {
      await fetch(`${apiUrl}/login`,
        {
          credentials: 'include',
        }).then(res => res.json()
      ).then(data => navigate(data.cognitoLoginURL))
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <nav className="navbar">

      <div className="navbar-left">
        <button>Create</button>
      </div>

      <div className="navbar-center">
        <a href="/">Cookbook</a>
      </div>

      <div className="navbar-right">
        <button className="username" onClick={user ? openProfile : queryLogin}>
          {user?.username ? user.username : 'Login'}
        </button>
      </div>

    </nav>

  )
}

export default Navbar;