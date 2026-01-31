import { useState } from 'react';
import './App.css';


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
      <div style={{ backgroundColor: '#FAF7F2', color: 'white', padding: '2em', height: '100%' }}>
        {JSON.stringify(data)}
        <br />
        <button onClick={getTodos}>
          Fetch Todos
        </button>
        <br />
        <button onClick={handleLogin}>
          Login
        </button>
      </div>
    </>
  )
}

export default App
