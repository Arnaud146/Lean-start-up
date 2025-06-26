import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebaseConfig';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { AnimatePresence, motion } from 'framer-motion';

import StepIntro         from './StepIntro.tsx';
import StepBirthdate     from './StepBirthdate.tsx';
import StepWeight        from './StepWeight.tsx';
import StepGender        from './StepGender.tsx';
import StepActivityGoal  from './StepActivityGoal.tsx';
import StepHandicapType  from './StepHandicapType.tsx';
import StepMuscleGroups  from './StepMuscleGroups.tsx';
import StepComplete      from './StepComplete.tsx';

export interface OnboardingData {
  birthdate: string;
  weight: number;
  gender: 'Masculin' | 'Féminin' | '';
  activity: 'Oui' | 'Un peu' | 'Rarement' | 'Non' | '';
  goal: string;
  handicap: string;
  muscles: string[];
}

const Onboarding: React.FC = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    birthdate: '',
    weight: 0,
    gender: '',
    activity: '',
    goal: '',
    handicap: '',
    muscles: [],
  });
  const navigate = useNavigate();

  const next = () => setStep(prev => prev + 1);
  const back = () => setStep(prev => prev - 1);
  const update = (fields: Partial<OnboardingData>) =>
    setData(prev => ({ ...prev, ...fields }));

  // Envoie des données vers Firestore
  const handleComplete = async () => {
    const user = auth.currentUser;
    if (!user) return;
    try {
      await setDoc(
        doc(db, 'users', user.uid),
        {
          birthdate: data.birthdate,
          weight:     data.weight,
          gender:     data.gender,
          activity:   data.activity,
          goal:       data.goal,
          handicap:   data.handicap,
          muscles:    data.muscles,
          updatedAt:  serverTimestamp()
        },
        { merge: true }
      );
      navigate('/home', { replace: true });
    } catch (error: any) {
      console.error('Erreur lors de l\'enregistrement du profil :', error.code, error.message, error);
      console.error('Erreur lors de l\'enregistrement du profil :', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        {step === 0 && <StepIntro onNext={next} />}
        {step === 1 && (
          <StepBirthdate
            birthdate={data.birthdate}
            onChange={d => update({ birthdate: d })}
            onNext={next}
            onBack={back}
          />
        )}
        {step === 2 && (
          <StepWeight
            weight={data.weight}
            onChange={w => update({ weight: w })}
            onNext={next}
            onBack={back}
          />
        )}
        {step === 3 && (
          <StepGender
            gender={data.gender}
            onChange={g => update({ gender: g })}
            onNext={next}
            onBack={back}
          />
        )}
        {step === 4 && (
          <StepActivityGoal
            activity={data.activity}
            goal={data.goal}
            onActivityChange={a => update({ activity: a })}
            onGoalChange={g => update({ goal: g })}
            onNext={next}
            onBack={back}
          />
        )}
        {step === 5 && (
          <StepHandicapType
            handicap={data.handicap}
            onChange={h => update({ handicap: h })}
            onNext={next}
            onBack={back}
          />
        )}
        {step === 6 && (
          <StepMuscleGroups
            muscles={data.muscles}
            onChange={m => update({ muscles: m })}
            onNext={next}
            onBack={back}
          />
        )}
        {step === 7 && (
          <StepComplete
  data={data}
  onComplete={handleComplete}
/>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
