import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register   from './components/Register.tsx';
import Login      from './components/Login.tsx';
import Onboarding from './components/onboarding/Onboarding.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import Articles from './components/Articles.tsx';
import ArticleDetail from './components/ArticleDetail.tsx';
import Exercises from './components/Exercises.tsx';
import ExerciseDetail from './components/ExerciseDetail.tsx';
import WelcomePage from './components/Accueil.tsx';
import { HomePage } from './components/Home.tsx';
import Profile from './components/Profile.tsx';
import EditProfile from './components/EditProfile.tsx';
import { InstallPWA } from './components/InstallPWA.tsx';
import { OfflineIndicator } from './components/OfflineIndicator.tsx';
import { usePWA } from './hooks/usePWA.ts';
import { useAccessibility } from './hooks/useAccessibility.ts';
import { ScreenReaderAnnouncer } from './components/ScreenReaderAnnouncer.tsx';
import * as serviceWorkerRegistration from './serviceWorkerRegistration.ts';

export default function App() {
  const { announceToScreenReader } = useAccessibility();
  const [announcement, setAnnouncement] = React.useState('');

  // Annoncer le chargement de l'application
  React.useEffect(() => {
    announceToScreenReader('Application Handy\'s chargée');
  }, [announceToScreenReader]);

  return (
    <Router>
      {/* Annonceur pour les lecteurs d'écran */}
      <ScreenReaderAnnouncer 
        message={announcement} 
        priority="polite"
        onAnnounce={() => setAnnouncement('')}
      />
      
      <OfflineIndicator />
      <Routes>
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login"    element={<Login />} />
        <Route path="/"              element={<WelcomePage />} />
        <Route path="/home"          element={<HomePage />} />
        <Route path="/onboarding"    element={<Onboarding />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:id" element={<ArticleDetail />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/exercises/:id" element={<ExerciseDetail />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/edit-profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
        
        <Route path="*" element={
          <div className="p-8 text-center" role="main">
            <h1 className="text-2xl font-bold mb-4">Page non trouvée</h1>
            <p>La page que vous recherchez n'existe pas.</p>
            <a href="/" className="text-primary underline mt-4 inline-block">
              Retour à l'accueil
            </a>
          </div>
        } />
      </Routes>
      <InstallPWA />
    </Router>
  );
}