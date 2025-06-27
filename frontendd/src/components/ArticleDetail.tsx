import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, increment, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useAccessibility } from '../hooks/useAccessibility.ts';
import { Button } from './Button.tsx';

// Types pour les données
interface Article {
  id: string;
  title?: string;
  content?: string;
  category?: string;
  imageUrl?: string;
  createdAt?: any;
  steps?: string[];
}

interface Exercise {
  id: string;
  title?: string;
  description?: string;
  imageUrl?: string;
}

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [otherArticles, setOtherArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { announceToScreenReader } = useAccessibility();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('🔍 Chargement article ID:', id);
        
        if (!id) {
          setError('ID de l\'article manquant');
          announceToScreenReader('ID de l\'article manquant');
          setLoading(false);
          return;
        }
        
        // Récupérer l'article
        const articleRef = doc(db, 'articles', id);
        const articleSnap = await getDoc(articleRef);
        
        if (articleSnap.exists()) {
          const articleData: Article = {
            id: articleSnap.id,
            ...articleSnap.data()
          };
          console.log('📄 Article trouvé:', articleData);
          setArticle(articleData);
          
          // Annoncer le chargement de l'article
          const title = articleData.title || 'Article sans titre';
          announceToScreenReader(`Article chargé : ${title}`);
          
          // Incrémenter le nombre de vues (optionnel)
          try {
            await updateDoc(articleRef, {
              views: increment(1)
            });
          } catch (viewError) {
            console.log('Note: Impossible d\'incrémenter les vues:', viewError);
          }
        } else {
          console.log('❌ Article non trouvé');
          setError('Article non trouvé');
          announceToScreenReader('Article non trouvé');
        }

        // Récupérer les exercices
        console.log('🔍 Chargement des exercices...');
        const exercisesRef = collection(db, 'exercises');
        const exercisesSnap = await getDocs(exercisesRef);
        
        const exercisesData: Exercise[] = exercisesSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        console.log('💪 Exercices récupérés:', exercisesData);
        setExercises(exercisesData.slice(0, 5));

        // Récupérer les autres articles
        console.log('🔍 Chargement des autres articles...');
        const articlesRef = collection(db, 'articles');
        const articlesSnap = await getDocs(articlesRef);
        
        const allArticles: Article[] = articlesSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Filtrer l'article actuel et prendre 3 différents
        const filteredArticles = allArticles.filter(art => art.id !== id);
        const selectedArticles = filteredArticles.slice(0, 3);
        
        console.log('📰 Autres articles récupérés:', selectedArticles);
        setOtherArticles(selectedArticles);
        
        setLoading(false);
      } catch (err) {
        console.error('❌ Erreur lors du chargement:', err);
        setError('Erreur lors du chargement');
        announceToScreenReader('Erreur lors du chargement de l\'article');
        setLoading(false);
      }
    };

    fetchData();
  }, [id, announceToScreenReader]);

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    
    if (timestamp.toDate) {
      return timestamp.toDate().toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
      });
    }
    
    return new Date(timestamp).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" role="main" aria-live="polite">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" aria-label="Chargement en cours"></div>
          <p className="mt-4 text-gray-600">Chargement de l'article...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" role="main">
        <div className="text-center">
          <p className="text-red-600 mb-4" role="alert">{error || 'Article non trouvé'}</p>
          <Button 
            onClick={() => navigate('/articles')}
            ariaLabel="Retour à la liste des articles"
          >
            Retour aux articles
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* VERSION DESKTOP */}
      <div className="hidden md:block">
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
                    ariaLabel="Voir les exercices"
                  >
                    Exercices
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate('/articles')}
                    aria-current="page"
                    ariaLabel="Voir les articles (page actuelle)"
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
        <main className="max-w-4xl mx-auto px-6 py-8" role="main" id="main-content">
          {/* Titre centré */}
          <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">
            {article.title || 'Article sans titre'}
          </h1>
          
          {/* Sous-titre centré */}
          <p className="text-lg text-gray-600 text-center mb-8">
            {article.category || "Programmes et exercices adaptés"}
          </p>

          {/* Image centrée */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 rounded-2xl p-8 w-96 h-64 flex justify-center items-center">
              {article.imageUrl && (
                <img 
                  src={`/${article.imageUrl}`}
                  alt={`Image illustrant l'article : ${article.title || 'Article'}`}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    console.error('❌ Erreur lors du chargement de l\'image:', article.imageUrl);
                    e.target.src = '/default-article.jpg';
                  }}
                />
              )}
            </div>
          </div>

          {/* Date publication */}
          <div className="text-center mb-8">
            <span className="text-sm text-gray-500" aria-label={`Article publié le ${formatDate(article.createdAt)}`}>
              Publié le {formatDate(article.createdAt)}
            </span>
          </div>

          {/* Contenu article */}
          <article className="max-w-3xl mx-auto text-gray-700 leading-relaxed mb-12">
            <div className="whitespace-pre-wrap">
              {Array.isArray(article.steps) && article.steps.length > 0 ? (
                <section aria-labelledby="article-steps-title" className="mb-8">
                  <h2 id="article-steps-title" className="text-xl font-bold mb-4">Étapes</h2>
                  <ol className="space-y-4 list-decimal list-inside" role="list">
                    {article.steps.map((step, idx) => (
                      <li key={idx} className="bg-gray-50 rounded p-4" role="listitem">
                        <strong>Étape {idx + 1}</strong>
                        <div>{step}</div>
                      </li>
                    ))}
                  </ol>
                </section>
              ) : (
                article.content || 'Contenu de l\'article non disponible'
              )}
            </div>
          </article>

          {/* Section exercices liés */}
          {exercises.length > 0 && (
            <section className="mb-12" aria-labelledby="exercises-title">
              <h2 id="exercises-title" className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Exercices liés
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
                {exercises.map((exercise) => (
                  <div key={exercise.id} className="bg-white rounded-lg shadow-md p-6" role="listitem">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {exercise.title || 'Exercice sans titre'}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {exercise.description || "Description de l'exercice"}
                    </p>
                    <Button 
                      onClick={() => navigate(`/exercises/${exercise.id}`)}
                      ariaLabel={`Voir les détails de l'exercice : ${exercise.title || 'Exercice'}`}
                    >
                      Voir l'exercice
                    </Button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section autres articles */}
          {otherArticles.length > 0 && (
            <section className="mb-12" aria-labelledby="other-articles-title">
              <h2 id="other-articles-title" className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Autres articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6" role="list">
                {otherArticles.map((otherArticle) => (
                  <div key={otherArticle.id} className="bg-white rounded-lg shadow-md overflow-hidden" role="listitem">
                    {otherArticle.imageUrl && (
                      <img 
                        src={`/${otherArticle.imageUrl}`}
                        alt={`Image de l'article : ${otherArticle.title || 'Article'}`}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {otherArticle.title || 'Article sans titre'}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {otherArticle.category || "Catégorie"}
                      </p>
                      <Button 
                        variant="ghost"
                        onClick={() => navigate(`/articles/${otherArticle.id}`)}
                        ariaLabel={`Lire l'article : ${otherArticle.title || 'Article'}`}
                      >
                        Lire l'article
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Bouton retour */}
          <div className="text-center">
            <Button 
              onClick={() => navigate('/articles')}
              ariaLabel="Retour à la liste des articles"
            >
              ← Retour aux articles
            </Button>
          </div>
        </main>
      </div>

      {/* VERSION MOBILE */}
      <div className="block md:hidden">
        {/* Header mobile */}
        <header className="bg-white shadow-sm sticky top-0 z-10" role="banner">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <Button 
              variant="ghost"
              onClick={() => navigate('/articles')}
              ariaLabel="Retour à la liste des articles"
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Retour aux articles
            </Button>
          </div>
        </header>

        {/* Contenu mobile */}
        <main className="max-w-4xl mx-auto px-4 py-8" role="main" id="main-content">
          {/* Titre */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            {article.title || 'Article sans titre'}
          </h1>

          {/* Image */}
          {article.imageUrl && (
            <div className="relative mb-6">
              <div className="bg-gray-100 rounded-3xl p-8 flex justify-center items-center min-h-80">
                <img 
                  src={`/${article.imageUrl}`}
                  alt={`Image illustrant l'article : ${article.title || 'Article'}`}
                  className="max-w-full max-h-64 object-contain"
                  onError={(e) => {
                    e.target.src = '/default-article.jpg';
                  }}
                />
              </div>
            </div>
          )}

          {/* Date */}
          <div className="mb-6">
            <span className="text-sm text-gray-500" aria-label={`Article publié le ${formatDate(article.createdAt)}`}>
              Publié le {formatDate(article.createdAt)}
            </span>
          </div>

          {/* Contenu */}
          <article className="bg-white rounded-2xl p-6 mb-8 border border-gray-200">
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {Array.isArray(article.steps) && article.steps.length > 0 ? (
                <section aria-labelledby="article-steps-title" className="mb-8">
                  <h2 id="article-steps-title" className="text-xl font-bold mb-4">Étapes</h2>
                  <ol className="space-y-4 list-decimal list-inside" role="list">
                    {article.steps.map((step, idx) => (
                      <li key={idx} className="bg-gray-50 rounded p-4" role="listitem">
                        <strong>Étape {idx + 1}</strong>
                        <div>{step}</div>
                      </li>
                    ))}
                  </ol>
                </section>
              ) : (
                article.content || 'Contenu de l\'article non disponible'
              )}
            </div>
          </article>

          {/* Exercices liés mobile */}
          {exercises.length > 0 && (
            <section className="mb-8" aria-labelledby="mobile-exercises-title">
              <h2 id="mobile-exercises-title" className="text-xl font-bold text-gray-900 mb-4">
                Exercices liés
              </h2>
              <div className="space-y-4" role="list">
                {exercises.map((exercise) => (
                  <div key={exercise.id} className="bg-white rounded-xl p-4 border border-gray-200" role="listitem">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {exercise.title || 'Exercice sans titre'}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {exercise.description || "Description de l'exercice"}
                    </p>
                    <Button 
                      onClick={() => navigate(`/exercises/${exercise.id}`)}
                      ariaLabel={`Voir les détails de l'exercice : ${exercise.title || 'Exercice'}`}
                    >
                      Voir l'exercice
                    </Button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Autres articles mobile */}
          {otherArticles.length > 0 && (
            <section className="mb-8" aria-labelledby="mobile-other-articles-title">
              <h2 id="mobile-other-articles-title" className="text-xl font-bold text-gray-900 mb-4">
                Autres articles
              </h2>
              <div className="space-y-4" role="list">
                {otherArticles.map((otherArticle) => (
                  <div key={otherArticle.id} className="bg-white rounded-xl overflow-hidden border border-gray-200" role="listitem">
                    {otherArticle.imageUrl && (
                      <img 
                        src={`/${otherArticle.imageUrl}`}
                        alt={`Image de l'article : ${otherArticle.title || 'Article'}`}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {otherArticle.title || 'Article sans titre'}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {otherArticle.category || "Catégorie"}
                      </p>
                      <Button 
                        variant="ghost"
                        onClick={() => navigate(`/articles/${otherArticle.id}`)}
                        ariaLabel={`Lire l'article : ${otherArticle.title || 'Article'}`}
                      >
                        Lire l'article
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default ArticleDetail;