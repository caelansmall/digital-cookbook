import { useState } from 'react';
import './App.css';
import BackgroundCarousel from './components/landing/BackgroundCarousel';
import LandingPage from './components/landing/LandingPage';


const apiUrl = import.meta.env.VITE_BASE_API;

function App() {
  const [data, setData] = useState({ "Message": "No Data"});

  const getTodos = async () => {
    try {
      const res = await fetch(`${apiUrl}/todos`, { credentials: 'include', });
      const data = await res.json();
      setData(data);
    } catch (error) {
      console.error(error);
      setData({ "Message": "Unauthenticated! Please login" })
    }
  }

  const handleLogin = () => {
    try {
      fetch(`${apiUrl}/login`, {
        credentials: 'include',
      }).then(res => res.json()
    ).then(data => window.location.href = data.cognitoLoginURL)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <LandingPage />
    </>
  )
}

export default App
