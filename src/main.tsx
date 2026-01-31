import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styling/index.css';
import App from './App.tsx';
import Auth from './Auth.tsx';
import NotFound from './NotFound.tsx';
import { AuthContextProvider } from './providers/AuthProvider.tsx';
import Navbar from './Navbar.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipeFeed from './components/RecipeFeed.tsx';
import RecipeForm from './forms/CreateRecipeForm.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import "@fontsource/playfair-display/600";
import { ConfigProvider, App as AntApp } from 'antd';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AntApp>
      <AuthContextProvider>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#6B8E7F",
              colorBgBase: "#FAF7F2",
              colorBorder: "#E3DDD4",
              fontFamily: "Inter, system-ui, sans-serif",
              borderRadius: 8,
            },
          }}
        >
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/auth/callback" element={<Auth />} />
              

              <Route element={<ProtectedRoute />}>
                {/* <Route path="/profile" element={<UserProfile />} /> */}
                <Route path="/feed" element={<RecipeFeed />} />
                <Route path="/recipe/create" element={<RecipeForm />} />
                {/* <Route path="/recipe:recipeId" element={<RecipePage />} /> */}
              </Route>
              
              <Route path="*" element={<NotFound />} />
              
            </Routes>
          </Router>
        </ConfigProvider>
      </AuthContextProvider>
    </AntApp>
  </StrictMode>
)
