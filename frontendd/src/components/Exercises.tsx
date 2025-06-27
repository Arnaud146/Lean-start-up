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

  // Fonction pour filtrer les exercices par catégorie
  const getExercisesByCategory = (categories) => {
    return exercises.filter(exercise => 
      categories.some(category => 
        exercise.category?.toLowerCase().includes(category.toLowerCase())
      )
    );
  };

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
        {/* Sections mobiles séparées */}
        <div className="px-4 py-6 space-y-6">
          {/* Section violette - Haut du corps */}
          <MobileSection 
            title="Découvre nos exercices pour le haut du corps !"
            color="purple"
            exercises={getExercisesByCategory(["Pectoraux", "Haut du corps"])}
            navigate={navigate}
          />

          {/* Section orange - Bas du corps */}
          <MobileSection 
            title="Découvre aussi nos exercices pour le bas du corps !"
            color="orange"
            exercises={getExercisesByCategory(["Jambes", "Bas du corps"])}
            navigate={navigate}
          />

          {/* Section violette - Retour au calme */}
          <MobileSection 
            title="N'oublie pas ton retour au calme !"
            color="purple"
            exercises={getExercisesByCategory(["Retour au calme", "Relaxation", "Étirement"])}
            navigate={navigate}
          />
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
                <div className="text-2xl font-bold text-purple-600">
                  <img src="/logo.webp" alt="Logo Handy's" className="w-8 h-8" />
                </div>
                <nav className="flex space-x-8">
                  <button onClick={() => navigate('/home')} className="text-gray-600 hover:text-purple-600">Accueil</button>
                  <button className="text-purple-600 font-medium">Exercices</button>
                  <button onClick={() => navigate('/articles')} className="text-gray-600 hover:text-purple-600">Articles</button>
                </nav>
              </div>

              {/* Recherche et profil */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-2">
                  <span className="text-sm"></span>
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
              exercises={getExercisesByCategory(["Pectoraux", "Haut du corps"])}
              navigate={navigate}
            />

            {/* Section orange - Bas du corps */}
            <DesktopSection 
              title="Découvre aussi nos exercices pour le bas du corps !"
              color="orange"
              exercises={getExercisesByCategory(["Jambes", "Bas du corps"])}
              navigate={navigate}
            />

            {/* Section violette - Retour au calme */}
            <DesktopSection 
              title="N'oublie pas ton retour au calme !"
              color="purple"
              exercises={getExercisesByCategory(["Retour au calme", "Relaxation", "Étirement"])}
              navigate={navigate}
            />
          </div>
        </div>
      </div>

      {/* Bottom Navigation (mobile uniquement) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="px-4 py-3">
          <div className="flex justify-around">
            <NavItem 
              icon="/home-icon.png" 
              label="Accueil" 
              onClick={() => navigate('/home')} 
            />
            <NavItem 
              icon="/exercise-icon.png" 
              label="Exercices" 
              active 
            />
            <NavItem 
              icon="/article-icon.png" 
              label="Articles" 
              onClick={() => navigate('/articles')} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Composant section mobile
const MobileSection = ({ title, color, exercises, navigate }) => {
  const bgColor = color === 'purple' 
    ? 'bg-gradient-to-r from-purple-600 to-purple-700' 
    : 'bg-gradient-to-r from-orange-500 to-orange-600';

  return (
    <div className={`${bgColor} rounded-2xl p-6 text-white relative`}>
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      
      {/* Icône d'édition */}
      <div className="absolute top-4 right-4">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </div>

      {/* Liste des exercices */}
      <div className="space-y-3">
        {exercises.map((exercise) => (
          <MobileExerciseCard 
            key={exercise.id} 
            exercise={exercise}
            onClick={() => navigate(`/exercises/${exercise.id}`)}
          />
        ))}
      </div>

      {/* Message si aucun exercice */}
      {exercises.length === 0 && (
        <div className="text-center py-4">
          <p className="text-white text-opacity-80 text-sm">Aucun exercice disponible dans cette catégorie pour le moment.</p>
        </div>
      )}
    </div>
  );
};

// Composant exercice mobile (dans section violette) - VERSION CORRIGÉE
const MobileExerciseCard = ({ exercise, onClick }) => {
  return (
    <div 
      className="bg-white bg-opacity-95 rounded-2xl p-4 cursor-pointer hover:bg-opacity-100 transition-all"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        {/* Partie gauche : Image + Contenu */}
        <div className="flex items-center gap-4 flex-1 min-w-0 pr-4">
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
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-sm mb-1 truncate">
              {exercise.title}
            </h3>
            <p className="text-gray-600 text-xs mb-3">
              {exercise.category || "Exercice"}
            </p>
            
            {/* Tags */}
            <div className="flex gap-2 flex-wrap">
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
        </div>

        {/* Flèche - TOUJOURS À DROITE */}
        <div className="text-orange-400 flex-shrink-0">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
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

      {/* Message si aucun exercice */}
      {exercises.length === 0 && (
        <div className="text-center py-8">
          <p className="text-white text-opacity-80">Aucun exercice disponible dans cette catégorie pour le moment.</p>
        </div>
      )}
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
        {exercise.category || "Exercice"}
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
    {typeof icon === 'string' && icon.includes('.png') ? (
      <img 
        src={icon} 
        alt={label}
        className="w-6 h-6 mb-1"
        onError={(e) => {
          e.target.src = '/default-nav-icon.png';
        }}
      />
    ) : (
      <span className="text-lg mb-1">{icon}</span>
    )}
    <span className="text-xs font-medium">{label}</span>
  </div>
);

export default ExercisesPage;