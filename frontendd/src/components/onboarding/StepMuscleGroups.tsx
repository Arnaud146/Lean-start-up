import React from 'react';

interface Props {
  muscles: string[];
  onChange(values: string[]): void;
  onNext(): void;
  onBack(): void;
}

const StepMuscleGroups = ({ muscles, onChange, onNext, onBack }: Props) => {
  const options = ['Bras', 'Jambes', 'Dos', 'Pectoraux', 'Abdominaux'];
  const toggle = (opt: string) => {
    if (muscles.includes(opt)) {
      onChange(muscles.filter(m => m !== opt));
    } else {
      onChange([...muscles, opt]);
    }
  };

  return (
    <>
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Muscles mobilisables</h2>
      <div className="mb-6 space-y-2">
        {options.map(opt => (
          <label key={opt} className="flex items-center">
            <input
              type="checkbox"
              value={opt}
              checked={muscles.includes(opt)}
              onChange={() => toggle(opt)}
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

export default StepMuscleGroups;
