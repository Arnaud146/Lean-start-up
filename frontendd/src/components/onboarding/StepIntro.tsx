import React from 'react';

interface Props {
  onNext(): void;
}

const StepIntro = ({ onNext }: Props) => (
  <>
    <h2 className="text-xl font-semibold text-center mb-4">Quelques questions ! :)</h2>
    <p className="text-center text-gray-600 mb-6">2 min</p>
    <p className="text-center text-gray-700 mb-8">
      Afin de personnaliser au mieux votre expérience sur Handy's, il nous en faut un peu plus sur vous.
    </p>
    <button
      onClick={onNext}
      className="w-full py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
    >
      C'est parti !
    </button>
  </>
);

export default StepIntro;
