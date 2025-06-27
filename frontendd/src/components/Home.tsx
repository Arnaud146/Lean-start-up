import React from 'react';
import { Input } from './Input.tsx';
import { Button } from './Button.tsx';
import { Badge } from './Badge.tsx';
import { Avatar, AvatarImage, AvatarFallback } from './Avatar.tsx';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from './Card.tsx';
import { useAccessibility } from '../hooks/useAccessibility.ts';
import { AccessibilityInfo } from './AccessibilityInfo.tsx';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.webp';

export function HomePage() {
  const { announceToScreenReader } = useAccessibility();
  const navigate = useNavigate();

  React.useEffect(() => {
    announceToScreenReader('Page d\'accueil Handy\'s chargée');
  }, [announceToScreenReader]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* HEADER */}
      <header className="w-full bg-white border-b" role="banner">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-8">
              <div className="text-2xl font-bold text-purple-600">
                <img src={logo} alt="Logo Handy's" className="w-8 h-8" />
              </div>
              <nav className="flex space-x-8" role="navigation" aria-label="Navigation principale">
              <button onClick={() => navigate('/home')} className="text-gray-600 hover:text-purple-600">Accueil</button>
                  <button onClick={() => navigate('/exercices')} aria-current="page" className="text-purple-600 font-medium">Exercices</button>
                  <button onClick={() => navigate('/articles')} className="text-gray-600 hover:text-purple-600">Articles</button>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden md:block w-64">
                <Input 
                  variant="rounded" 
                  placeholder="Rechercher un exercice" 
                  aria-label="Rechercher un exercice"
                />
              </div>
              {/* Mobile search icon */}
              <div className="flex md:hidden">
                <Button 
                  variant="outline" 
                  size="icon"
                  ariaLabel="Ouvrir la recherche"
                  description="Bouton pour ouvrir la barre de recherche sur mobile"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1012.5 3a7.5 7.5 0 004.15 13.65z" />
                  </svg>
                </Button>
              </div>
              {/* Badge + Avatar */}
              <div className="flex items-center space-x-2">
                <Badge variant="destructive" size="sm" aria-label="34 points de motivation">34🔥</Badge>
                <Avatar>
                  <AvatarImage src="/assets/avatar.png" alt="Photo de profil de l'utilisateur" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main id="main-content" className="flex-1 px-6 py-8 md:px-10 md:py-12" role="main">
        <h1 className="text-2xl md:text-4xl font-bold">
          Hello <span className="text-amber-500">John</span>
        </h1>
        <p className="text-lg md:text-2xl mt-1 md:mt-2">Prêt à te lancer ?</p>

        {/* Session du jour */}
        <section className="mt-6 md:mt-8 max-w-3xl mx-auto" aria-labelledby="session-title">
          <Card className="bg-primary text-primary-foreground">
            <CardHeader className="flex justify-between items-center pt-6">
              <CardTitle id="session-title">Séance du jour</CardTitle>
              <span className="text-sm opacity-75" aria-label="Durée de la séance">⏱ 38 min</span>
            </CardHeader>
            <CardContent className="space-y-4 pt-2">
              {/* Exercise items */}
              <div className="bg-background rounded-md p-4 flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Extensions des jambes</h4>
                  <div className="mt-1 space-x-2">
                    <Badge variant="outline" size="sm">Facile</Badge>
                    <Badge variant="outline" size="sm">3 min</Badge>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  ariaLabel="Voir les détails de l'exercice Extensions des jambes"
                >
                  ›
                </Button>
              </div>
              <div className="bg-muted rounded-md p-4 flex justify-between items-center opacity-50" aria-label="Exercice verrouillé">
                <div>
                  <h4 className="text-muted-foreground">Rotation des épaules</h4>
                  <div className="mt-1 space-x-2">
                    <Badge variant="outline" size="sm">Facile</Badge>
                    <Badge variant="outline" size="sm">15 min</Badge>
                  </div>
                </div>
                <span aria-label="Exercice verrouillé">🔒</span>
              </div>
              <div className="bg-muted rounded-md p-4 flex justify-between items-center opacity-50" aria-label="Exercice verrouillé">
                <div>
                  <h4 className="text-muted-foreground">Extension vers le haut</h4>
                  <div className="mt-1 space-x-2">
                    <Badge variant="outline" size="sm">Facile</Badge>
                    <Badge variant="outline" size="sm">3 min</Badge>
                  </div>
                </div>
                <span aria-label="Exercice verrouillé">🔒</span>
              </div>
            </CardContent>
            <CardFooter className="justify-center">
              <Button 
                variant="destructive" 
                size="lg"
                ariaLabel="Commencer la séance du jour"
                description="Lance la séance d'exercices prévue pour aujourd'hui"
              >
                Go !
              </Button>
            </CardFooter>
          </Card>

          <div className="mt-4 text-center">
            <p>Tu en veux plus ?</p>
            <Button 
              variant="destructive" 
              className="mt-2"
              ariaLabel="Voir tous les exercices disponibles"
            >
              Voir tous les exercices ›
            </Button>
          </div>
        </section>

        {/* Articles */}
        <section className="mt-10 md:mt-16" aria-labelledby="articles-title">
          <h2 id="articles-title" className="text-xl md:text-3xl font-bold text-center mb-6 md:mb-8">
            Découvre nos derniers articles
          </h2>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" role="list">
            {[
              { src: '/tennis.jpg', title: "5 exercices doux pour fauteuil roulant à essayer aujourd'hui" },
              { src: '/nageur.jpg', title: "Les bienfaits cachés de l'activité physique adaptée" },
              { src: '/tele.jpg', title: "Le sport : un levier vital pour les personnes handicapées" },
            ].map((item, idx) => (
              <Card key={idx} className="overflow-hidden" role="listitem">
                <img src={item.src} alt={item.title} className="w-full h-40 object-cover" />
                <CardContent>
                  <CardTitle className="text-base mb-2">{item.title}</CardTitle>
                  <Button 
                    variant="ghost"
                    ariaLabel={`Lire l'article : ${item.title}`}
                  >
                    Je découvre&nbsp;!
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button 
              variant="ghost"
              ariaLabel="Voir tous les articles disponibles"
            >
              Voir tous les articles ›
            </Button>
          </div>
        </section>
      </main>

      {/* Bottom navigation mobile */}
      <nav className="fixed bottom-0 left-0 right-0 flex justify-around items-center py-2 bg-background border-t md:hidden" role="navigation" aria-label="Navigation mobile">
        <Button 
          variant="ghost" 
          size="icon"
          ariaLabel="Aller à l'accueil"
          aria-current="page"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6" />
          </svg>
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          ariaLabel="Ajouter un exercice"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          ariaLabel="Voir le menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
          </svg>
        </Button>
      </nav>

      {/* Accessibility Info Button - Fixed position */}
      <div className="fixed bottom-20 right-4 z-40">
        <AccessibilityInfo />
      </div>
    </div>
  );
}
