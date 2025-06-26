import React from 'react';

interface Props {
  weight: number;
  onChange(value: number): void;
  onNext(): void;
  onBack(): void;
}

const StepWeight = ({ weight, onChange, onNext, onBack }: Props) => (
  <>
    <h2 className="text-lg font-semibold text-gray-900 mb-2">Combien pesez-vous environ ?</h2>
    <input
      type="number"
      placeholder="kg"
      value={weight}
      onChange={e => onChange(Number(e.target.value))}
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

export default StepWeight;
