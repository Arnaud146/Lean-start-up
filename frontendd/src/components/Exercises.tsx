import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const ExercisesPage = () => {
  const navigate = useNavigate();
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        console.log('🔍 Chargement des exercices...');
        const exercisesRef = collection(db, 'exercises');
        const querySnapshot = await getDocs(exercisesRef);
        
        const exercisesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        console.log('💪 Exercices récupérés:', exercisesData);
        setExercises(exercisesData);
        setLoading(false);
      } catch (err) {
        console.error('❌ Erreur lors du chargement des exercices:', err);
        setError('Erreur lors du chargement des exercices');
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des exercices...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* VERSION MOBILE */}
      <div className="block lg:hidden">
        {/* Header mobile avec recherche */}
        <div className="bg-white px-4 py-6">
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Rechercher un exercice"
              className="w-full px-4 py-3 pr-10 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Section violette mobile */}
        <div className="mx-4 mb-6">
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-6 text-white relative">
            <h2 className="text-xl font-bold mb-4">Découvre nos exercices<br />pour le haut du corps !</h2>
            
            {/* Icône d'édition */}
            <div className="absolute top-4 right-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>

            {/* Liste des exercices dans la section violette */}
            <div className="space-y-3">
              {exercises.map((exercise) => (
                <MobileExerciseCard 
                  key={exercise.id} 
                  exercise={exercise}
                  onClick={() => navigate(`/exercises/${exercise.id}`)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Espacement pour navigation */}
        <div className="h-20"></div>
      </div>

      {/* VERSION DESKTOP */}
      <div className="hidden lg:block">
        {/* Header desktop */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center space-x-8">
                <div className="text-2xl font-bold text-purple-600">H</div>
                <nav className="flex space-x-8">
                  <button onClick={() => navigate('/')} className="text-gray-600 hover:text-purple-600">Accueil</button>
                  <button className="text-purple-600 font-medium">Exercices</button>
                  <button onClick={() => navigate('/articles')} className="text-gray-600 hover:text-purple-600">Articles</button>
                </nav>
              </div>

              {/* Recherche et profil */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Rechercher un exercice"
                    className="px-4 py-2 pr-10 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
                  />
                  <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-2">
                  <span className="text-sm">54€</span>
                  <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contenu principal desktop */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Sections colorées desktop */}
          <div className="space-y-8">
            {/* Section violette - Haut du corps */}
            <DesktopSection 
              title="Découvre nos exercices pour le haut du corps !"
              color="purple"
              exercises={exercises.filter(ex => ex.category === "Pectoraux" || ex.category === "Haut du corps")}
              navigate={navigate}
            />

            {/* Section orange - Bas du corps */}
            <DesktopSection 
              title="Découvre aussi nos exercices pour le bas du corps !"
              color="orange"
              exercises={exercises.filter(ex => ex.category === "Jambes" || ex.category === "Bas du corps")}
              navigate={navigate}
            />

            {/* Section violette - Bien-être */}
            <DesktopSection 
              title="N'oublie pas ton retour au calme !"
              color="purple"
              exercises={exercises.filter(ex => ex.category === "Relaxation" || ex.category === "Étirement")}
              navigate={navigate}
            />
          </div>
        </div>
      </div>

      {/* Bottom Navigation (mobile uniquement) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="px-4 py-3">
          <div className="flex justify-around">
            <NavItem icon="🏠" label="Accueil" onClick={() => navigate('/')} />
            <NavItem icon="💪" label="Exercices" active />
            <NavItem icon="📰" label="Articles" onClick={() => navigate('/articles')} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Composant exercice mobile (dans section violette)
const MobileExerciseCard = ({ exercise, onClick }) => {
  return (
    <div 
      className="bg-white bg-opacity-95 rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:bg-opacity-100 transition-all"
      onClick={onClick}
    >
      {/* Image */}
      <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
        {exercise.imageUrl && (
          <img 
            src={`/${exercise.imageUrl}`}
            alt={exercise.title}
            className="w-12 h-12 object-contain"
            onError={(e) => {
              e.target.src = '/default-exercise.jpg';
            }}
          />
        )}
      </div>

      {/* Contenu */}
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 text-sm mb-1">
          {exercise.title}
        </h3>
        <p className="text-gray-600 text-xs mb-3">
          {exercise.category || "Haut du corps"}
        </p>
        
        {/* Tags */}
        <div className="flex gap-2">
          {exercise.difficulty && (
            <span className="px-3 py-1 border border-orange-400 text-orange-600 text-xs font-medium rounded-full">
              {exercise.difficulty}
            </span>
          )}
          {exercise.duration && (
            <span className="px-3 py-1 border border-orange-400 text-orange-600 text-xs font-medium rounded-full">
              {exercise.duration} min
            </span>
          )}
        </div>
      </div>

      {/* Flèche */}
      <div className="text-orange-400">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
};

// Section desktop avec grille d'exercices
const DesktopSection = ({ title, color, exercises, navigate }) => {
  const bgColor = color === 'purple' 
    ? 'bg-gradient-to-r from-purple-600 to-purple-700' 
    : 'bg-gradient-to-r from-orange-500 to-orange-600';

  return (
    <div className={`${bgColor} rounded-3xl p-8 text-white relative`}>
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      
      {/* Icône d'édition */}
      <div className="absolute top-6 right-6">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </div>

      {/* Grille d'exercices */}
      <div className="grid grid-cols-3 gap-4">
        {exercises.slice(0, 6).map((exercise) => (
          <DesktopExerciseCard 
            key={exercise.id}
            exercise={exercise}
            onClick={() => navigate(`/exercises/${exercise.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

// Carte exercice desktop
const DesktopExerciseCard = ({ exercise, onClick }) => {
  return (
    <div 
      className="bg-white bg-opacity-95 rounded-2xl p-4 cursor-pointer hover:bg-opacity-100 transition-all"
      onClick={onClick}
    >
      {/* Image */}
      <div className="w-full h-24 bg-gray-100 rounded-xl flex items-center justify-center mb-3">
        {exercise.imageUrl && (
          <img 
            src={`/${exercise.imageUrl}`}
            alt={exercise.title}
            className="w-16 h-16 object-contain"
            onError={(e) => {
              e.target.src = '/default-exercise.jpg';
            }}
          />
        )}
      </div>

      {/* Contenu */}
      <h3 className="font-semibold text-gray-900 text-sm mb-1">
        {exercise.title}
      </h3>
      <p className="text-gray-600 text-xs mb-3">
        {exercise.category || "Haut du corps"}
      </p>
      
      {/* Tags */}
      <div className="flex gap-2 mb-3">
        {exercise.difficulty && (
          <span className="px-2 py-1 border border-orange-400 text-orange-600 text-xs font-medium rounded-full">
            {exercise.difficulty}
          </span>
        )}
        {exercise.duration && (
          <span className="px-2 py-1 border border-orange-400 text-orange-600 text-xs font-medium rounded-full">
            {exercise.duration} min
          </span>
        )}
      </div>

      {/* Flèche */}
      <div className="flex justify-end">
        <div className="text-orange-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

// Composant pour la navigation mobile
const NavItem = ({ icon, label, active = false, onClick }) => (
  <div 
    className={`flex flex-col items-center py-2 px-3 cursor-pointer ${active ? 'text-orange-500' : 'text-gray-500'}`}
    onClick={onClick}
  >
    <span className="text-lg mb-1">{icon}</span>
    <span className="text-xs font-medium">{label}</span>
  </div>
);

export default ExercisesPage;