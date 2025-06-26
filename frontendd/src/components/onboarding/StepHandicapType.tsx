import React from 'react';

interface Props {
  handicap: string;
  onChange(value: string): void;
  onNext(): void;
  onBack(): void;
}

const StepHandicapType = ({ handicap, onChange, onNext, onBack }: Props) => {
  const options = ['Visuel', 'Auditif', 'Moteur', 'Cognitif'];
  return (
    <>
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Type de handicap</h2>
      <div className="mb-6 space-y-2">
        {options.map(opt => (
          <label key={opt} className="flex items-center">
            <input
              type="radio"
              name="handicap"
              value={opt}
              checked={handicap === opt}
              onChange={() => onChange(opt)}
              className="mr-2"
            />
            {opt}
          </label>
        ))}
      </div>
      <div className="flex justify-between">
        <button onClick={onBack} className="px-4 py-2">Retour</button>
        <button onClick={onNext} className="px-4 py-2 bg-indigo-600 text-white rounded-md">
          Suivant
        </button>
      </div>
    </>
  );
};

export default StepHandicapType;
