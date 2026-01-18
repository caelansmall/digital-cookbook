import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_BASE_API;

const Auth = () => {
  const [searchParams] = useSearchParams();
  const authrorizationCode = searchParams.get("code");
  const state = searchParams.get("state");

  useEffect(() => {
    console.log('Fetching authentication...')
    fetch(apiUrl + "/token?code=" + authrorizationCode + "&state=" + state, { credentials: 'include', })
      .then(res => { if (res.status === 200) window.location.href = "/" })
      .catch(err => console.log(err))
  })

  return (
    <div>Authenticating...</div>
  )

}

export default Auth