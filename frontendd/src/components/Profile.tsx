import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.ts';
import { getUserProfile } from '../services/db.ts';
import type { OnboardingData } from './onboarding/Onboarding.tsx';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<OnboardingData | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const userProfile = await getUserProfile();
        setProfile(userProfile);
      } catch (error) {
        console.error('Erreur lors du chargement du profil:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Non renseigné';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  const calculateAge = (dateString: string) => {
    if (!dateString) return null;
    const birthDate = new Date(dateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-white border-b border-gray-100">
        <div className="container mx-auto flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center">
              <img src="./assets/logo.webp" alt="Logo Handy's" className="w-8 h-8" />
            </div>
            <span className="text-gray-600 font-medium">Handy's</span>
          </div>

          {/* Search - full width on mobile, fixed on desktop */}
          <div className="flex-1 mx-4 max-w-md sm:max-w-sm lg:max-w-lg">
            <input
              type="text"
              placeholder="Rechercher"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Navigation links hidden on mobile */}
          <nav className="hidden sm:flex space-x-6">
            <button onClick={() => navigate('/home')} className="text-purple-600 font-medium">Accueil</button>
            <button onClick={() => navigate('/exercises')} className="text-gray-600 hover:text-purple-600">Exercices</button>
            <button onClick={() => navigate('/articles')} className="text-gray-600 hover:text-purple-600">Articles</button>
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header du profil */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
             
              <button
                onClick={() => navigate('/edit-profile')}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Modifier le profil
              </button>
            </div>
          </div>

          {/* Informations du profil */}
          {profile && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Informations personnelles</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Informations de base */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Date de naissance</h3>
                    <p className="mt-1 text-lg text-gray-900">
                      {formatDate(profile.birthdate)}
                      {profile.birthdate && (
                        <span className="text-gray-500 ml-2">({calculateAge(profile.birthdate)} ans)</span>
                      )}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Genre</h3>
                    <p className="mt-1 text-lg text-gray-900">{profile.gender || 'Non renseigné'}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Poids</h3>
                    <p className="mt-1 text-lg text-gray-900">
                      {profile.weight ? `${profile.weight} kg` : 'Non renseigné'}
                    </p>
                  </div>
                </div>

                {/* Informations d'activité */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Niveau d'activité</h3>
                    <p className="mt-1 text-lg text-gray-900">{profile.activity || 'Non renseigné'}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Type de handicap</h3>
                    <p className="mt-1 text-lg text-gray-900">{profile.handicap || 'Non renseigné'}</p>
                  </div>
                </div>
              </div>

              {/* Objectif */}
              {profile.goal && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Objectif</h3>
                  <p className="text-lg text-gray-900 bg-gray-50 p-4 rounded-lg">{profile.goal}</p>
                </div>
              )}

              {/* Groupes musculaires */}
              {profile.muscles && profile.muscles.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Groupes musculaires ciblés</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.muscles.map((muscle) => (
                      <span
                        key={muscle}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800"
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Message si pas de profil */}
          {!profile && (
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <p className="text-gray-600 mb-4">Aucune information de profil trouvée.</p>
              <button
                onClick={() => navigate('/edit-profile')}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Créer mon profil
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
