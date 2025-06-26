import React from 'react';
import { usePWA } from '../hooks/usePWA.ts';

interface InstallPWAProps {
  className?: string;
}

export const InstallPWA: React.FC<InstallPWAProps> = ({ className = '' }) => {
  const { isInstallable, isInstalled, installApp } = usePWA();

  if (isInstalled) {
    return null;
  }

  if (!isInstallable) {
    return null;
  }

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      <button
        onClick={installApp}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 transition-colors duration-200"
      >
        <svg 
          className="w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" 
          />
        </svg>
        <span>Installer l'app</span>
      </button>
    </div>
  );
}; 