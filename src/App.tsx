import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';

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
      <div className="card">
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

// function App() {
//   const [count, setCount] = useState(0)

//   // const fetchAPI = async () => {
//   //   const response = await axios.get('http://localhost:8080/api');
//   //   console.log(response)
//   // };

//   // useEffect(() => {
//   //   fetchAPI();
//   // }, []);

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

export default App
