import React from 'react';

interface Props {
  activity: 'Oui' | 'Un peu' | 'Rarement' | 'Non' | '';
  goal: string;
  onActivityChange(value: 'Oui' | 'Un peu' | 'Rarement' | 'Non'): void;
  onGoalChange(value: string): void;
  onNext(): void;
  onBack(): void;
}

const StepActivityGoal = ({
  activity,
  goal,
  onActivityChange,
  onGoalChange,
  onNext,
  onBack,
}: Props) => (
  <>
    <h2 className="text-lg font-semibold text-gray-900 mb-2">Votre niveau d'activité</h2>
    <div className="mb-4 space-y-2">
      {['Oui', 'Un peu', 'Rarement', 'Non'].map(option => (
        <label key={option} className="flex items-center">
          <input
            type="radio"
            name="activity"
            value={option}
            checked={activity === option}
            onChange={() => onActivityChange(option as any)}
            className="mr-2"
          />
          {option}
        </label>
      ))}
    </div>
    <h2 className="text-lg font-semibold text-gray-900 mb-2">Votre objectif</h2>
    <input
      type="text"
      placeholder="Ex: Prendre du muscle"
      value={goal}
      onChange={e => onGoalChange(e.target.value)}
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

export default StepActivityGoal;
