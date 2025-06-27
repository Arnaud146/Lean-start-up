import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, updateUserProfile } from '../services/db.ts';
import { useAuth } from '../hooks/useAuth.ts';
import type { OnboardingData } from './onboarding/Onboarding.tsx';

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<OnboardingData>({
    birthdate: '',
    weight: 0,
    gender: '',
    activity: '',
    goal: '',
    handicap: '',
    muscles: [],
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const userProfile = await getUserProfile();
        if (userProfile) {
          setProfile(userProfile);
        }
      } catch (error) {
        console.error('Erreur lors du chargement du profil:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateUserProfile(profile);
      navigate('/profile');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    } finally {
      setSaving(false);
    }
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
            <button 
              onClick={() => navigate('/profile')}
              className="text-gray-600 hover:text-purple-600"
            >
              ← Retour
            </button>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center">
              <img src="./assets/logo.webp" alt="Logo Handy's" className="w-8 h-8" />
            </div>
            <span className="text-gray-600 font-medium">Handy's</span>
          </div>
          <h1 className="text-lg font-semibold text-gray-900">Modifier le profil</h1>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-6">
            {/* Date de naissance */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date de naissance
              </label>
              <input
                type="date"
                value={profile.birthdate}
                onChange={(e) => setProfile({ ...profile, birthdate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Poids */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Poids (kg)
              </label>
              <input
                type="number"
                value={profile.weight}
                onChange={(e) => setProfile({ ...profile, weight: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                min="0"
                step="0.1"
              />
            </div>

            {/* Genre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Genre
              </label>
              <select
                value={profile.gender}
                onChange={(e) => setProfile({ ...profile, gender: e.target.value as 'Masculin' | 'Féminin' | '' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Sélectionner</option>
                <option value="Masculin">Masculin</option>
                <option value="Féminin">Féminin</option>
              </select>
            </div>

            {/* Niveau d'activité */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Niveau d'activité
              </label>
              <select
                value={profile.activity}
                onChange={(e) => setProfile({ ...profile, activity: e.target.value as 'Oui' | 'Un peu' | 'Rarement' | 'Non' | '' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Sélectionner</option>
                <option value="Oui">Oui</option>
                <option value="Un peu">Un peu</option>
                <option value="Rarement">Rarement</option>
                <option value="Non">Non</option>
              </select>
            </div>

            {/* Objectif */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Objectif
              </label>
              <textarea
                value={profile.goal}
                onChange={(e) => setProfile({ ...profile, goal: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows={3}
                placeholder="Décrivez votre objectif..."
              />
            </div>

            {/* Type de handicap */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type de handicap
              </label>
              <input
                type="text"
                value={profile.handicap}
                onChange={(e) => setProfile({ ...profile, handicap: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Type de handicap..."
              />
            </div>

            {/* Groupes musculaires */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Groupes musculaires ciblés
              </label>
              <div className="space-y-2">
                {['Bras', 'Jambes', 'Dos', 'Épaules', 'Poitrine', 'Abdominaux'].map((muscle) => (
                  <label key={muscle} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={profile.muscles.includes(muscle)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setProfile({ ...profile, muscles: [...profile.muscles, muscle] });
                        } else {
                          setProfile({ ...profile, muscles: profile.muscles.filter(m => m !== muscle) });
                        }
                      }}
                      className="mr-2 text-purple-600 focus:ring-purple-500"
                    />
                    {muscle}
                  </label>
                ))}
              </div>
            </div>

            {/* Boutons */}
            <div className="flex space-x-4 pt-6">
              <button
                onClick={() => navigate('/profile')}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Annuler
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
              >
                {saving ? 'Sauvegarde...' : 'Sauvegarder'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditProfile; 