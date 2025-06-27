import React from 'react';
import { useNavigate } from 'react-router-dom';


const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-indigo-700 flex flex-col items-center justify-between py-10 px-4">
      <div className="flex-1 flex flex-col items-center justify-center">
        <img  src="./assets/logo.webp" alt="Handy's Logo" className="h-32 w-auto mb-8" />
        <h1 className="text-white text-3xl font-bold mb-2 text-center">
          Bienvenue sur Handy&apos;s !
        </h1>
        <p className="text-white text-center mb-8">
          Des tutoriels sportifs adaptés à vos capacités et objectifs.
        </p>
        <button
          className="w-full max-w-xs bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-full mb-4 transition-colors"
          onClick={() => navigate('/auth/register')}
        >
          Inscription
        </button>
        <button
          className="w-full max-w-xs bg-white hover:bg-gray-100 text-indigo-700 font-semibold py-3 rounded-full transition-colors"
          onClick={() => navigate('/auth/login')}
        >
          J&apos;ai déjà un compte
        </button>
      </div>
      <p className="text-white text-xs text-center px-4">
        En continuant, vous acceptez nos{' '}
        <a href="#" className="underline">
          Conditions d&apos;utilisation
        </a>{' '}
        et notre{' '}
        <a href="#" className="underline">
          Politique de confidentialité
        </a>.
      </p>
    </div>
  );
};

export default WelcomePage;
