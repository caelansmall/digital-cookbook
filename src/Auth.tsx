import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useUser } from './contexts/AuthContext';
import { jwtDecode } from 'jwt-decode';
import { readUserByUsername } from './services/users.service';

const apiUrl = import.meta.env.VITE_BASE_API;

const grabUserContext = async (res) => {
  const temp = await res.json();
  const authenticatedUser = jwtDecode(temp.id_token);
  console.log(authenticatedUser['cognito:username']);
  await readUserByUsername(authenticatedUser['cognito:username'],res);

  // console.log('>>',jwtDecode(temp.id_token))
  // console.log();
  // window.location.href = "/";
} 

const Auth = () => {
  const [searchParams] = useSearchParams();
  const authrorizationCode = searchParams.get("code");
  const state = searchParams.get("state");
  const { user, updateUser } = useUser();

  useEffect(() => {
    console.log('Fetching authentication...')
    fetch(apiUrl + "/token?code=" + authrorizationCode + "&state=" + state, { credentials: 'include', })
      .then(res => { if (res.status === 200) grabUserContext(res) }) // window.location.href = "/"
      .catch(err => console.log(err))
  })

  return (
    <div>Authenticating...</div>
  )

}

export default Auth