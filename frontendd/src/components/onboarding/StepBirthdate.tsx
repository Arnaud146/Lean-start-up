import React from 'react';

interface Props {
  birthdate: string;
  onChange(value: string): void;
  onNext(): void;
  onBack(): void;
}

const StepBirthdate = ({ birthdate, onChange, onNext, onBack }: Props) => (
  <>
    <h2 className="text-lg font-semibold text-gray-900 mb-2">Votre date de naissance</h2>
    <p className="text-sm text-gray-600 mb-4">
      Inscrivez votre date de naissance pour que l'on puisse vous donner des exercices adaptés à vos capacités !
    </p>
    <input
      type="date"
      value={birthdate}
      onChange={e => onChange(e.target.value)}
      className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 mb-6"
    />
    <div className="flex justify-between">
      <button onClick={onBack} className="px-4 py-2">Retour</button>
      <button onClick={onNext} className="px-4 py-2 bg-indigo-600 text-white rounded-md">
        Suivant
      </button>
    </div>
  </>
);

export default StepBirthdate;
