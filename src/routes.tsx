import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import Auth from './Auth.tsx';

function NotFound() {
  return <div style={{padding:20}}>404 — Page not found</div>
}

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/auth/callback" element={<Auth />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}