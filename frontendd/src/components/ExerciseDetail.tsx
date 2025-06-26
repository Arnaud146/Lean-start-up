import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const ExerciseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        console.log('🔍 Chargement exercice ID:', id);
        const exerciseRef = doc(db, 'exercises', id);
        const exerciseSnap = await getDoc(exerciseRef);
        
        if (exerciseSnap.exists()) {
          const exerciseData = {
            id: exerciseSnap.id,
            ...exerciseSnap.data()
          };
          setExercise(exerciseData);
        } else {
          console.log('❌ Exercice non trouvé');
          setError('Exercice non trouvé');
        }
        setLoading(false);
      } catch (err) {
        console.error('❌ Erreur lors du chargement de l\'exercice:', err);
        setError('Erreur lors du chargement de l\'exercice');
        setLoading(false);
      }
    };

    if (id) {
      fetchExercise();
    }
  }, [id]);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'débutant':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'intermédiaire':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'avancé':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement de l'exercice...</p>
        </div>
      </div>
    );
  }

  if (error || !exercise) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Exercice non trouvé'}</p>
          <button 
            onClick={() => navigate('/exercises')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retour aux exercices
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec bouton retour */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button 
            onClick={() => navigate('/exercises')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-2"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour aux exercices
          </button>
        </div>
      </div>

      {/* Exercise Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Titre de l'exercice */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          {exercise.title}
        </h1>

        {/* Image principale dans un cadre arrondi */}
        {exercise.imageUrl && (
          <div className="relative mb-6">
            <div className="bg-gray-100 rounded-3xl p-8 flex justify-center items-center min-h-80">
              <img 
                src={`/${exercise.imageUrl}`}
                alt={exercise.title}
                className="max-w-full max-h-64 object-contain"
                onError={(e) => {
                  // Fallback vers une image par défaut si l'image n'existe pas
                  e.target.src = '/default-exercise.jpg';
                }}
              />
            </div>
          </div>
        )}

        {/* Tags catégorie et informations */}
        <div className="mb-8">
          {/* Catégorie en haut */}
          {exercise.category && (
            <div className="text-gray-700 font-medium mb-3">
              {exercise.category}
            </div>
          )}
          
          {/* Tags orange en dessous */}
          <div className="flex gap-3">
            {exercise.difficulty && (
              <span className="px-4 py-2 border-2 border-orange-400 text-orange-600 rounded-full text-sm font-medium">
                {exercise.difficulty}
              </span>
            )}
            {exercise.duration && (
              <span className="px-4 py-2 border-2 border-orange-400 text-orange-600 rounded-full text-sm font-medium">
                {exercise.duration} min
              </span>
            )}
          </div>
        </div>

        {/* Précautions */}
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-8 mb-8 text-white">
          <div className="flex items-center mb-4">
            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h2 className="text-xl font-bold">Précautions</h2>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Consultez un professionnel de santé avant de commencer.</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Écoutez votre corps et arrêtez en cas de douleur.</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Faites un échauffement puis un retour au calme.</span>
            </li>
          </ul>
        </div>

        {/* Bienfaits */}
        <div className="bg-white rounded-2xl p-6 mb-8 border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Bienfaits</h2>
          <p className="text-gray-700 leading-relaxed">
            {exercise.benefits || "Cet étirement ouvre la cage thoracique, améliore la posture et libère les tensions du haut du corps. Prends le temps de sentir ton souffle."}
          </p>
        </div>

        {/* Comment faire */}
        <div className="bg-gradient-to-b from-orange-400 to-orange-500 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-6">Comment faire ?</h2>
          
          {/* Étapes */}
          <div className="space-y-4 mb-6">
            {exercise.steps ? (
              exercise.steps.map((step, index) => (
                <div key={index} className="bg-white bg-opacity-90 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Étape {index + 1}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{step}</p>
                </div>
              ))
            ) : (
              // Étapes par défaut si pas de steps dans Firebase
              <>
                <div className="bg-white bg-opacity-90 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Étape 1</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Place-toi debout ou assis(e), le dos bien droit.
                  </p>
                </div>
                <div className="bg-white bg-opacity-90 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Étape 2</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Tends les bras à l'horizontale, de chaque côté, comme un oiseau.
                  </p>
                </div>
                <div className="bg-white bg-opacity-90 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Étape 3</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Écarte doucement les bras en les étirant au maximum, sans forcer.
                  </p>
                </div>
                <div className="bg-white bg-opacity-90 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Étape 4</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Tiens cette position, en respirant calmement, pendant quelques secondes (10 à 20 secondes selon ton confort).
                  </p>
                </div>
                <div className="bg-white bg-opacity-90 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Étape 5</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Relâche doucement.
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Bouton Terminer */}
          <button 
            onClick={() => {
              // Vous pouvez ajouter ici la logique pour marquer l'exercice comme terminé
              alert('Félicitations ! Exercice terminé avec succès ! 🎉');
            }}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-between hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg"
          >
            <span>Terminer</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Précautions */}
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-8 mb-8 text-white">
          <div className="flex items-center mb-4">
            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h2 className="text-xl font-bold">Précautions</h2>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Consultez un professionnel de santé avant de commencer.</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Écoutez votre corps et arrêtez en cas de douleur.</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Faites un échauffement puis un retour au calme.</span>
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-center">
            <button 
              onClick={() => navigate('/exercises')}
              className="flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Voir plus d'exercices
            </button>
          </div>
        </div>
      </div>

      {/* Espacement pour la navigation bottom */}
      <div className="h-20"></div>
    </div>
  );
};

export default ExerciseDetail;