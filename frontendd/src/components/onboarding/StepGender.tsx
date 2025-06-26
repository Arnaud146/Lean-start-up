import React from 'react';

interface Props {
  gender: 'Masculin' | 'Féminin' | '';
  onChange(value: 'Masculin' | 'Féminin'): void;
  onNext(): void;
  onBack(): void;
}

const StepGender = ({ gender, onChange, onNext, onBack }: Props) => (
  <>
    <h2 className="text-lg font-semibold text-gray-900 mb-2">Votre genre</h2>
    <div className="mb-6 flex justify-around">
      <label className="flex items-center">
        <input
          type="radio"
          name="gender"
          value="Masculin"
          checked={gender === 'Masculin'}
          onChange={() => onChange('Masculin')}
          className="mr-2"
        />
        Masculin
      </label>
      <label className="flex items-center">
        <input
          type="radio"
          name="gender"
          value="Féminin"
          checked={gender === 'Féminin'}
          onChange={() => onChange('Féminin')}
          className="mr-2"
        />
        Féminin
      </label>
    </div>
    <div className="flex justify-between">
      <button onClick={onBack} className="px-4 py-2">Retour</button>
      <button onClick={onNext} className="px-4 py-2 bg-indigo-600 text-white rounded-md">
        Suivant
      </button>
    </div>
  </>
);

export default StepGender;
