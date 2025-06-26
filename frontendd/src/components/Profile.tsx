import React from "react";
import { Card, CardContent } from "./Card.tsx";
import { Button } from "./Button.tsx";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar.tsx";
import { Badge } from "./Badge.tsx";
import { Switch } from "./Switch.tsx";
import { Link } from "react-router-dom";

const Profile = () => {
  const streakDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  const completedDays = [true, true, true, true, true, false, false];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 shadow-sm">
        <div className="flex items-center max-w-md mx-auto">
          <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900">
            <span className="w-5 h-5 mr-1">←</span>
            <span>Retour</span>
          </Link>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Profile Header */}
        <div className="text-center">
          <div className="relative inline-block mb-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md border">
              <span className="text-xs">✏️</span>
            </button>
          </div>
          <h1 className="text-xl font-semibold text-gray-900">John Doe</h1>
        </div>

        {/* Streak Card */}
        <Card className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-orange-500 rounded-full p-2">
                <span className="text-white text-lg">🔥</span>
              </div>
              <div>
                <div className="text-xl font-bold">34 séances quotidiennes</div>
                <div className="text-white/80 text-sm">consécutives, Bravo !</div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              {streakDays.map((day, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="text-xs text-white/80 mb-1">{day}</div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    completedDays[index] 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-white/20 text-white/60'
                  }`}>
                    {completedDays[index] ? '✓' : ''}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Profile Section */}
        <Card className="bg-purple-50 border-purple-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Profil</h2>
              <Button variant="outline" size="sm" className="border-purple-300 text-purple-600 hover:bg-purple-100">
                Modifier ✏️
              </Button>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Âge</span>
                <span className="font-medium">24 ans</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Poids</span>
                <span className="font-medium">89 Kg</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Mobilité</span>
                <span className="font-medium">Haut et bas</span>
              </div>
              <div className="flex justify-between items-start py-2">
                <span className="text-gray-600">Handicap</span>
                <span className="font-medium text-right">Handicap moteur d'origine ner..</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preferences Section */}
        <Card className="bg-orange-50 border-orange-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Préférences</h2>
              <Button variant="outline" size="sm" className="border-orange-300 text-orange-600 hover:bg-orange-100">
                Modifier ✏️
              </Button>
            </div>
            
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Difficulté</span>
              <span className="font-medium">Facile - Moyen</span>
            </div>
          </CardContent>
        </Card>

        {/* Settings Section */}
        <Card className="bg-gray-100 border-gray-200">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Paramètres</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-gray-900">Rappels</div>
                  <div className="text-sm text-gray-600">Permettre à l'application de vous envoyer des rappels</div>
                </div>
                <Switch />
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-gray-900">Notifications</div>
                  <div className="text-sm text-gray-600">Permettre à l'application de vous envoyer des notifications</div>
                </div>
                <Switch />
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-gray-900">Accessibilité</div>
                  <div className="text-sm text-gray-600">Activer le mode accessibilité</div>
                </div>
                <Switch />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support Section */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Une question? Un avis ?</h3>
            <p className="text-gray-600 text-sm mb-4">Notre équipe est à votre écoute.</p>
            
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-600">Email : </span>
                <a href="mailto:support@handys.fr" className="text-blue-600 underline">support@handys.fr</a>
              </div>
              <div>
                <span className="text-gray-600">Téléphone : </span>
                <a href="tel:+33123456789" className="text-blue-600">+33 1 23 45 67 89</a>
              </div>
            </div>
            
            <Button variant="outline" className="w-full mt-4">
              Nous envoyer un message
              <span className="ml-2">→</span>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-md mx-auto flex justify-around py-2">
          <Link to="/" className="flex flex-col items-center py-2 px-4">
            <div className="w-6 h-6 text-gray-400">🏠</div>
            <span className="text-xs text-gray-400 mt-1">Accueil</span>
          </Link>
          <button className="flex flex-col items-center py-2 px-4">
            <div className="w-6 h-6 text-gray-400">💪</div>
            <span className="text-xs text-gray-400 mt-1">Exercices</span>
          </button>
          <button className="flex flex-col items-center py-2 px-4">
            <div className="w-6 h-6 text-orange-500">📄</div>
            <span className="text-xs text-orange-500 mt-1 font-medium">Articles</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;