// src/components/onboarding/StepComplete.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { saveUserProfile } from '../../services/db';
import type { OnboardingData } from './Onboarding';

interface Props {
  data: OnboardingData;
  onComplete: () => Promise<void>;
}

const StepComplete: React.FC<Props> = ({ data, onComplete }) => {
  return (
    <>
      <h2 className="text-xl font-semibold text-center mb-4">Merci !</h2>
      <p className="text-center text-gray-600 mb-6">
        Votre profil est prêt. Découvrez votre programme personnalisé.
      </p>
      <button
        onClick={onComplete}
        className="w-full py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
      >
        Accéder au tableau de bord
      </button>
    </>
  );
};

export default StepComplete;
