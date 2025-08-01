import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const ArticlesPage = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupérer les articles depuis Firebase
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articlesRef = collection(db, 'articles');
        const q = query(articlesRef, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        
        const articlesData = [];
        querySnapshot.forEach((doc) => {
          articlesData.push({
            id: doc.id,
            ...doc.data()
          });
        });
        
        setArticles(articlesData);
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors du chargement des articles:', err);
        setError('Erreur lors du chargement des articles');
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des articles...</p>
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
      {/* Desktop Layout */}
      <div className="hidden md:block">
        {/* Header Navigation Desktop */}
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
                  <button onClick={() => navigate('/exercises')} className="text-gray-600 hover:text-purple-600">Exercices</button>
                  <button className="text-purple-600 font-medium">Articles</button>
                </nav>
              </div>

              {/* Profil */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-2">
                  <span className="text-sm"></span>
                  <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Header Desktop */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <h1 className="text-4xl font-bold text-gray-900 text-center mb-2">Articles</h1>
            <p className="text-gray-600 text-center text-lg">
              Actualités et conseils autour du sport et de la santé
            </p>
          </div>
        </div>

        {/* Section principale avec titre */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Découvre des actualités et conseils pour un sport inclusif adapté !
          </h2>
          
          {/* Grille d'articles - tous les articles */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            {articles.map((article) => (
              <DesktopArticleCard 
                key={article.id} 
                article={article} 
                onClick={() => navigate(`/articles/${article.id}`)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        {/* Header Mobile */}
        <div className="bg-white shadow-sm">
          <div className="px-4 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Articles</h1>
            <p className="text-gray-600 text-sm mt-1">
              Découvre des actualités et conseils pour un sport inclusif adapté !
            </p>
          </div>
        </div>

        {/* Articles Mobile */}
        <div className="px-4 py-4 space-y-4 pb-24">
          {articles.map((article) => (
            <MobileArticleCard 
              key={article.id} 
              article={article} 
              onClick={() => navigate(`/articles/${article.id}`)}
            />
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
          <div className="px-4 py-3">
            <div className="flex justify-around">
              <NavItem 
                icon={require('../assets/home-icon.png')} 
                label="Accueil" 
                onClick={() => navigate('/home')} 
              />
              <NavItem 
                icon={require('../assets/exercise-icon.png')} 
                label="Exercices" 
                onClick={() => navigate('/exercises')} 
              />
              <NavItem 
                icon={require('../assets/article-icon.png')} 
                label="Articles" 
                active
                onClick={() => navigate('/articles')}
              />
              <NavItem 
                icon="👤" 
                label="Profil" 
                onClick={() => navigate('/profile')} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Composant pour les cartes d'articles desktop
const DesktopArticleCard = ({ article, onClick, isLarge = false }) => {
  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    
    if (timestamp.toDate) {
      return timestamp.toDate().toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    }
    
    return new Date(timestamp).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div 
      className={`bg-purple-200 rounded-3xl overflow-hidden cursor-pointer transition-transform hover:scale-105 ${isLarge ? 'h-80' : 'h-72'}`}
      onClick={onClick}
    >
      {/* Image */}
      <div className={`relative ${isLarge ? 'h-40' : 'h-32'} flex items-center justify-center`}>
        <img 
          src={article.imageUrl || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'} 
          alt={article.title}
          className="max-w-full max-h-full object-contain rounded-lg"
        />
      </div>
      
      {/* Contenu */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <h3 className={`font-bold text-gray-900 mb-2 line-clamp-2 ${isLarge ? 'text-base' : 'text-sm'}`}>
            {article.title}
          </h3>
          
          {article.excerpt && (
            <p className={`text-gray-700 mb-3 line-clamp-2 ${isLarge ? 'text-sm' : 'text-xs'}`}>
              {article.excerpt}
            </p>
          )}
        </div>
        
        <div className="flex justify-center mt-auto">
          <button className="bg-purple-600 text-white px-4 py-2 rounded-full font-medium text-sm hover:bg-purple-700 transition-colors">
            Je découvre !
          </button>
        </div>
      </div>
    </div>
  );
};

// Composant pour les cartes d'articles mobile
const MobileArticleCard = ({ article, onClick }) => {
  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    
    if (timestamp.toDate) {
      return timestamp.toDate().toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    }
    
    return new Date(timestamp).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-purple-200 rounded-3xl p-6 cursor-pointer">
      {/* Image centrée */}
      <div className="flex justify-center mb-4">
        <div className="w-full max-w-sm flex justify-center items-center" style={{ minHeight: '200px' }}>
          <img 
            src={article.imageUrl || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'} 
            alt={article.title}
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>
      </div>
      
      {/* Titre centré */}
      <h3 className="font-bold text-gray-900 text-lg text-center mb-3 leading-tight">
        {article.title}
      </h3>
      
      {/* Description centrée */}
      {article.excerpt && (
        <p className="text-gray-700 text-sm text-center mb-6 leading-relaxed px-2">
          {article.excerpt}
        </p>
      )}
      
      {/* Bouton centré */}
      <div className="flex justify-center">
        <button 
          onClick={onClick}
          className="bg-purple-600 text-white px-6 py-3 rounded-full font-medium text-sm hover:bg-purple-700 transition-colors"
        >
          Voir l'article
        </button>
      </div>
    </div>
  );
};

// Composant pour les éléments de navigation
const NavItem = ({ icon, label, active = false, onClick }) => (
  <div 
    className={`flex flex-col items-center py-2 px-3 cursor-pointer ${active ? 'text-blue-600' : 'text-gray-500'}`}
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

export default ArticlesPage;