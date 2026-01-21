// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styling/index.css';
import App from './App.tsx';
import Auth from './Auth.tsx';
import NotFound from './NotFound.tsx';
import { AuthContextProvider } from './providers/AuthProvider.tsx';
import Navbar from './Navbar.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
// import RecipeFeed from './RecipeFeed.tsx';
import RecipeForm from './forms/CreateRecipeForm.tsx';

createRoot(document.getElementById('root')!).render(
  <AuthContextProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/auth/callback" element={<Auth />} />
        {/* <Route path="/profile" element={<UserProfile />} /> */}
        {/* <Route path="/feed" element={<RecipeFeed />} /> */}
        <Route path="/recipe/create" element={<RecipeForm />} />
        <Route path="*" element={<NotFound />} />
        {/* <Route path="/recipe:recipeId" element={<RecipePage />} /> */}
        
      </Routes>
    </Router>
  </AuthContextProvider>
)
