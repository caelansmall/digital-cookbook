import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import Auth from './Auth.tsx';
import NotFound from './NotFound.tsx';
import { AuthContextProvider } from './providers/AuthProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/auth/callback" element={<Auth />} />
          {/* <Route path="/profile" element={<UserProfile />} /> */}
          {/* <Route path="/feed" element={<RecipeFeed />} />*/}
          {/* <Route path="/recipe:recipeId" element={<RecipePage />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  </StrictMode>
)
