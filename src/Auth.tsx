import { useEffect } from 'react';
import { useAuth } from './providers/AuthProvider';
import { useNavigate } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_BASE_API;

const Auth = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Fetching authentication...')
    const timer = setTimeout(() => {
      fetch(`${apiUrl}/me`, {
        credentials: 'include',
      })
        .then(async (res) => {
          if (!res.ok) throw new Error("Not authenticated");
          return res.json();
        })
        .then((user) => {
          setUser(user);
          navigate("/feed");
        })
        .catch(() => {
          navigate("/login");
        });
    }, 100);

    return () => clearTimeout(timer);
  }, [])

  return (
    <div>Authenticating...</div>
  )

}

export default Auth
