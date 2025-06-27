import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useAccessibility } from '../hooks/useAccessibility.ts';
import { Button } from './Button.tsx';

// Types pour les données
interface Exercise {
  id: string;
  title?: string;
  description?: string;
  category?: string;
  difficulty?: string;
  duration?: string;
  benefits?: string;
  steps?: string[];
  imageUrl?: string;
  precautions?: string;
}

const ExerciseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { announceToScreenReader } = useAccessibility();

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        console.log('🔍 Chargement exercice ID:', id);
        
        if (!id) {
          setError('ID de l\'exercice manquant');
          announceToScreenReader('ID de l\'exercice manquant');
          setLoading(false);
          return;
        }
        
        const exerciseRef = doc(db, 'exercises', id);
        const exerciseSnap = await getDoc(exerciseRef);
        
        if (exerciseSnap.exists()) {
          const exerciseData: Exercise = {
            id: exerciseSnap.id,
            ...exerciseSnap.data()
          };
          setExercise(exerciseData);
          
          // Annoncer le chargement de l'exercice
          const title = exerciseData.title || 'Exercice sans titre';
          announceToScreenReader(`Exercice chargé : ${title}`);
        } else {
          console.log('❌ Exercice non trouvé');
          setError('Exercice non trouvé');
          announceToScreenReader('Exercice non trouvé');
        }
        setLoading(false);
      } catch (err) {
        console.error('❌ Erreur lors du chargement de l\'exercice:', err);
        setError('Erreur lors du chargement de l\'exercice');
        announceToScreenReader('Erreur lors du chargement de l\'exercice');
        setLoading(false);
      }
    };

    fetchExercise();
  }, [id, announceToScreenReader]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" role="main" aria-live="polite">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" aria-label="Chargement en cours"></div>
          <p className="mt-4 text-gray-600">Chargement de l'exercice...</p>
        </div>
      </div>
    );
  }

  if (error || !exercise) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" role="main">
        <div className="text-center">
          <p className="text-red-600 mb-4" role="alert">{error || 'Exercice non trouvé'}</p>
          <Button 
            onClick={() => navigate('/exercises')}
            ariaLabel="Retour à la liste des exercices"
          >
            Retour aux exercices
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* VERSION MOBILE - inchangée */}
      <div className="block lg:hidden">
        {/* Header avec bouton retour */}
        <header className="bg-white shadow-sm sticky top-0 z-10" role="banner">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <Button 
              variant="ghost"
              onClick={() => navigate('/exercises')}
              ariaLabel="Retour à la liste des exercices"
              className="flex items-center text-gray-600 hover:text-gray-900 mb-2"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Retour aux exercices
            </Button>
          </div>
        </header>

        {/* Exercise Content Mobile */}
        <main className="max-w-4xl mx-auto px-4 py-8" role="main" id="main-content">
          {/* Titre de l'exercice */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            {exercise.title || 'Exercice sans titre'}
          </h1>

          {/* Image principale dans un cadre arrondi */}
          {exercise.imageUrl && (
            <div className="relative mb-6">
              <div className="bg-gray-100 rounded-3xl p-8 flex justify-center items-center min-h-80">
                <img 
                  src={`/${exercise.imageUrl}`}
                  alt={`Image illustrant l'exercice : ${exercise.title || 'Exercice'}`}
                  className="max-w-full max-h-64 object-contain"
                  onError={(e) => {
                    e.target.src = '/default-exercise.jpg';
                  }}
                />
              </div>
            </div>
          )}

          {/* Tags catégorie et informations */}
          <div className="mb-8">
            {exercise.category && (
              <div className="text-gray-700 font-medium mb-3" aria-label={`Catégorie : ${exercise.category}`}>
                {exercise.category}
              </div>
            )}
            
            <div className="flex gap-3">
              {exercise.difficulty && (
                <span className="px-4 py-2 border-2 border-orange-400 text-orange-600 rounded-full text-sm font-medium" aria-label={`Difficulté : ${exercise.difficulty}`}>
                  {exercise.difficulty}
                </span>
              )}
              {exercise.duration && (
                <span className="px-4 py-2 border-2 border-orange-400 text-orange-600 rounded-full text-sm font-medium" aria-label={`Durée : ${exercise.duration} minutes`}>
                  {exercise.duration} min
                </span>
              )}
            </div>
          </div>

          {/* Précautions */}
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-8 mb-8 text-white" role="region" aria-labelledby="precautions-title">
            <div className="flex items-center mb-4">
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <h2 id="precautions-title" className="text-xl font-bold">Précautions importantes</h2>
            </div>
            <ul className="space-y-3" role="list" aria-label="Liste des précautions à prendre">
              <li className="flex items-start" role="listitem">
                <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0" aria-hidden="true"></span>
                <span>Consultez un professionnel de santé avant de commencer.</span>
              </li>
              <li className="flex items-start" role="listitem">
                <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0" aria-hidden="true"></span>
                <span>Écoutez votre corps et arrêtez en cas de douleur.</span>
              </li>
              <li className="flex items-start" role="listitem">
                <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0" aria-hidden="true"></span>
                <span>Faites un échauffement puis un retour au calme.</span>
              </li>
            </ul>
          </div>
          {/* Bienfaits */}
          <section className="bg-white rounded-2xl p-6 mb-8 border border-gray-200" aria-labelledby="benefits-title" role="region">
            <h2 id="benefits-title" className="text-lg font-bold text-gray-900 mb-3">Bienfaits de cet exercice</h2>
            <p className="text-gray-700 leading-relaxed" aria-describedby="benefits-title">
              {exercise.benefits || "Cet étirement ouvre la cage thoracique, améliore la posture et libère les tensions du haut du corps. Prends le temps de sentir ton souffle."}
            </p>
          </section>

          {/* Comment faire */}
          <section className="bg-gradient-to-b from-orange-400 to-orange-500 rounded-2xl p-6 mb-8" aria-labelledby="how-to-title">
            <h2 id="how-to-title" className="text-xl font-bold text-white mb-6">Comment faire ?</h2>
            
            <div role="region" aria-labelledby="how-to-title" aria-describedby="steps-description" aria-live="polite">
              <div id="steps-description" className="sr-only">
                Instructions détaillées pour réaliser cet exercice étape par étape. Commencez par la première étape et suivez l'ordre indiqué.
              </div>
              
              <ol className="space-y-4 mb-6 list-decimal list-inside" role="list" aria-label="Étapes de l'exercice">
                {exercise.steps ? (
                  exercise.steps.map((step, index) => (
                    <li key={index} className="bg-white bg-opacity-90 rounded-xl p-4" role="listitem" aria-label={`Étape ${index + 1} sur ${exercise.steps.length}`}>
                      <div className="flex items-start">
                        <span className="font-bold text-orange-600 mr-2" aria-hidden="true">Étape {index + 1}</span>
                        <div className="flex-1" role="text" aria-label={`Instruction étape ${index + 1} : ${step}`}>
                          {step}
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <>
                    <li className="bg-white bg-opacity-90 rounded-xl p-4" role="listitem" aria-label="Étape 1 sur 5">
                      <div className="flex items-start">
                        <span className="font-bold text-orange-600 mr-2" aria-hidden="true">Étape 1</span>
                        <div className="flex-1" role="text" aria-label="Instruction étape 1 : Place-toi debout ou assis(e), le dos bien droit">
                          Place-toi debout ou assis(e), le dos bien droit.
                        </div>
                      </div>
                    </li>
                    <li className="bg-white bg-opacity-90 rounded-xl p-4" role="listitem" aria-label="Étape 2 sur 5">
                      <div className="flex items-start">
                        <span className="font-bold text-orange-600 mr-2" aria-hidden="true">Étape 2</span>
                        <div className="flex-1" role="text" aria-label="Instruction étape 2 : Tends les bras à l'horizontale, de chaque côté, comme un oiseau">
                          Tends les bras à l'horizontale, de chaque côté, comme un oiseau.
                        </div>
                      </div>
                    </li>
                    <li className="bg-white bg-opacity-90 rounded-xl p-4" role="listitem" aria-label="Étape 3 sur 5">
                      <div className="flex items-start">
                        <span className="font-bold text-orange-600 mr-2" aria-hidden="true">Étape 3</span>
                        <div className="flex-1" role="text" aria-label="Instruction étape 3 : Écarte doucement les bras en les étirant au maximum, sans forcer">
                          Écarte doucement les bras en les étirant au maximum, sans forcer.
                        </div>
                      </div>
                    </li>
                    <li className="bg-white bg-opacity-90 rounded-xl p-4" role="listitem" aria-label="Étape 4 sur 5">
                      <div className="flex items-start">
                        <span className="font-bold text-orange-600 mr-2" aria-hidden="true">Étape 4</span>
                        <div className="flex-1" role="text" aria-label="Instruction étape 4 : Tiens cette position, en respirant calmement, pendant quelques secondes (10 à 20 secondes selon ton confort)">
                          Tiens cette position, en respirant calmement, pendant quelques secondes (10 à 20 secondes selon ton confort).
                        </div>
                      </div>
                    </li>
                    <li className="bg-white bg-opacity-90 rounded-xl p-4" role="listitem" aria-label="Étape 5 sur 5">
                      <div className="flex items-start">
                        <span className="font-bold text-orange-600 mr-2" aria-hidden="true">Étape 5</span>
                        <div className="flex-1" role="text" aria-label="Instruction étape 5 : Relâche doucement">
                          Relâche doucement.
                        </div>
                      </div>
                    </li>
                  </>
                )}
              </ol>
            </div>

            <Button 
              onClick={() => {
                announceToScreenReader('Félicitations ! Exercice terminé avec succès !');
                alert('Félicitations ! Exercice terminé avec succès ! 🎉');
              }}
              ariaLabel="Marquer l'exercice comme terminé"
              description="Cliquez pour confirmer que vous avez terminé cet exercice"
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-between hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg"
            >
              <span>Terminer</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </Button>
          </section>
        </main>
      </div>

      {/* VERSION DESKTOP */}
      <div className="hidden lg:block">
        {/* Header desktop */}
        <header className="bg-white border-b" role="banner">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center space-x-8">
                <div className="text-2xl font-bold text-purple-600" aria-label="Logo Handy's">
                  <img src="/logo.webp" alt="Logo Handy's" className="w-8 h-8" />
                </div>
                <nav className="flex space-x-8" role="navigation" aria-label="Navigation principale">
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate('/')}
                    ariaLabel="Aller à l'accueil"
                  >
                    Accueil
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate('/exercises')}
                    aria-current="page"
                    ariaLabel="Voir les exercices (page actuelle)"
                  >
                    Exercices
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate('/articles')}
                    ariaLabel="Voir les articles"
                  >
                    Articles
                  </Button>
                </nav>
              </div>

              {/* Profil */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-2">
                  <span className="text-sm"></span>
                  <div className="w-6 h-6 bg-gray-300 rounded-full" aria-label="Avatar utilisateur"></div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Contenu principal desktop */}
        <main className="max-w-6xl mx-auto px-6 py-8" role="main" id="main-content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Colonne gauche - Image et infos */}
            <div>
              {/* Titre */}
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                {exercise.title || 'Exercice sans titre'}
              </h1>

              {/* Image */}
              {exercise.imageUrl && (
                <div className="mb-8">
                  <div className="bg-gray-100 rounded-3xl p-12 flex justify-center items-center min-h-96">
                    <img 
                      src={`/${exercise.imageUrl}`}
                      alt={`Image illustrant l'exercice : ${exercise.title || 'Exercice'}`}
                      className="max-w-full max-h-80 object-contain"
                      onError={(e) => {
                        e.target.src = '/default-exercise.jpg';
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Informations */}
              <div className="space-y-6">
                {exercise.category && (
                  <div className="bg-white rounded-2xl p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Catégorie</h3>
                    <p className="text-gray-700">{exercise.category}</p>
                  </div>
                )}

                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations</h3>
                  <div className="flex gap-4">
                    {exercise.difficulty && (
                      <div>
                        <span className="text-sm text-gray-500">Difficulté</span>
                        <p className="font-medium">{exercise.difficulty}</p>
                      </div>
                    )}
                    {exercise.duration && (
                      <div>
                        <span className="text-sm text-gray-500">Durée</span>
                        <p className="font-medium">{exercise.duration} min</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Précautions */}
                {exercise.precautions && (
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-red-900 mb-3">⚠️ Précautions</h3>
                    <p className="text-red-800 leading-relaxed">
                      {exercise.precautions}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Colonne droite - Contenu */}
            <div className="space-y-8">
              {/* Bienfaits */}
              <section className="bg-white rounded-2xl p-8 border border-gray-200" aria-labelledby="desktop-benefits-title" role="region">
                <h2 id="desktop-benefits-title" className="text-2xl font-bold text-gray-900 mb-4">Bienfaits de cet exercice</h2>
                <p className="text-gray-700 leading-relaxed text-lg" aria-describedby="desktop-benefits-title">
                  {exercise.benefits || "Cet étirement ouvre la cage thoracique, améliore la posture et libère les tensions du haut du corps. Prends le temps de sentir ton souffle."}
                </p>
              </section>

              {/* Comment faire */}
              <section className="bg-gradient-to-b from-orange-400 to-orange-500 rounded-2xl p-8" aria-labelledby="desktop-how-to-title">
                <h2 id="desktop-how-to-title" className="text-2xl font-bold text-white mb-6">Comment faire ?</h2>
                
                <div role="region" aria-labelledby="desktop-how-to-title" aria-describedby="desktop-steps-description" aria-live="polite">
                  <div id="desktop-steps-description" className="sr-only">
                    Instructions détaillées pour réaliser cet exercice étape par étape. Commencez par la première étape et suivez l'ordre indiqué.
                  </div>
                  
                  <ol className="space-y-4 mb-8 list-decimal list-inside" role="list" aria-label="Étapes de l'exercice">
                    {exercise.steps ? (
                      exercise.steps.map((step, index) => (
                        <li key={index} className="bg-white bg-opacity-90 rounded-xl p-6" role="listitem" aria-label={`Étape ${index + 1} sur ${exercise.steps.length}`}>
                          <div className="flex items-start">
                            <span className="font-bold text-orange-600 mr-2" aria-hidden="true">Étape {index + 1}</span>
                            <div className="flex-1" role="text" aria-label={`Instruction étape ${index + 1} : ${step}`}>
                              {step}
                            </div>
                          </div>
                        </li>
                      ))
                    ) : (
                      <>
                        <li className="bg-white bg-opacity-90 rounded-xl p-6" role="listitem" aria-label="Étape 1 sur 5">
                          <div className="flex items-start">
                            <span className="font-bold text-orange-600 mr-2" aria-hidden="true">Étape 1</span>
                            <div className="flex-1" role="text" aria-label="Instruction étape 1 : Place-toi debout ou assis(e), le dos bien droit">
                              Place-toi debout ou assis(e), le dos bien droit.
                            </div>
                          </div>
                        </li>
                        <li className="bg-white bg-opacity-90 rounded-xl p-6" role="listitem" aria-label="Étape 2 sur 5">
                          <div className="flex items-start">
                            <span className="font-bold text-orange-600 mr-2" aria-hidden="true">Étape 2</span>
                            <div className="flex-1" role="text" aria-label="Instruction étape 2 : Tends les bras à l'horizontale, de chaque côté, comme un oiseau">
                              Tends les bras à l'horizontale, de chaque côté, comme un oiseau.
                            </div>
                          </div>
                        </li>
                        <li className="bg-white bg-opacity-90 rounded-xl p-6" role="listitem" aria-label="Étape 3 sur 5">
                          <div className="flex items-start">
                            <span className="font-bold text-orange-600 mr-2" aria-hidden="true">Étape 3</span>
                            <div className="flex-1" role="text" aria-label="Instruction étape 3 : Écarte doucement les bras en les étirant au maximum, sans forcer">
                              Écarte doucement les bras en les étirant au maximum, sans forcer.
                            </div>
                          </div>
                        </li>
                        <li className="bg-white bg-opacity-90 rounded-xl p-6" role="listitem" aria-label="Étape 4 sur 5">
                          <div className="flex items-start">
                            <span className="font-bold text-orange-600 mr-2" aria-hidden="true">Étape 4</span>
                            <div className="flex-1" role="text" aria-label="Instruction étape 4 : Tiens cette position, en respirant calmement, pendant quelques secondes (10 à 20 secondes selon ton confort)">
                              Tiens cette position, en respirant calmement, pendant quelques secondes (10 à 20 secondes selon ton confort).
                            </div>
                          </div>
                        </li>
                        <li className="bg-white bg-opacity-90 rounded-xl p-6" role="listitem" aria-label="Étape 5 sur 5">
                          <div className="flex items-start">
                            <span className="font-bold text-orange-600 mr-2" aria-hidden="true">Étape 5</span>
                            <div className="flex-1" role="text" aria-label="Instruction étape 5 : Relâche doucement">
                              Relâche doucement.
                            </div>
                          </div>
                        </li>
                      </>
                    )}
                  </ol>
                </div>

                <Button 
                  onClick={() => {
                    announceToScreenReader('Félicitations ! Exercice terminé avec succès !');
                    alert('Félicitations ! Exercice terminé avec succès ! 🎉');
                  }}
                  ariaLabel="Marquer l'exercice comme terminé"
                  description="Cliquez pour confirmer que vous avez terminé cet exercice"
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-between hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg"
                >
                  <span>Terminer l'exercice</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </Button>
              </section>

              {/* Bouton retour */}
              <div className="text-center">
                <Button 
                  onClick={() => navigate('/exercises')}
                  variant="ghost"
                  ariaLabel="Retour à la liste des exercices"
                >
                  ← Retour aux exercices
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ExerciseDetail;