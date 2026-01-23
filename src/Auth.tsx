import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { jwtDecode, type JwtPayload } from 'jwt-decode';
import { readUserByUsername } from './services/users.service';
import { useAuth } from './providers/AuthProvider';
import { useNavigate } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_BASE_API;

interface CognitoPayload extends JwtPayload {
  'cognito:username': string;
}

const Auth = () => {
  const [searchParams] = useSearchParams();
  const authrorizationCode = searchParams.get("code");
  const state = searchParams.get("state");
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const grabUserContext = async (res: Response) => {
    const temp = await res.json();
    const authenticatedUser: CognitoPayload = jwtDecode(temp.id_token);
    const userFound = await readUserByUsername(authenticatedUser['cognito:username']);

    // await setUser({...userFound});
    return userFound;
  } 

  useEffect(() => {
    console.log('Fetching authentication...')
    fetch(apiUrl + "/token?code=" + authrorizationCode + "&state=" + state, { credentials: 'include', })
      .then(res => { if (res.status === 200) {
        const loadUser = async () => {
          try {
            const currentUser = await grabUserContext(res);
            setUser(currentUser);            
          } catch {
            console.log('Error fetching user data');
          }
        };
        
        loadUser();
        navigate("/");
      } })
      .catch(err => console.log(err))
  }, [])

  return (
    <div>Authenticating...</div>
  )

}

export default Auth