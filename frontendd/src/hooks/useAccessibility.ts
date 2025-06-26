import { useCallback, useEffect, useRef } from 'react';

interface UseAccessibilityReturn {
  announceToScreenReader: (message: string) => void;
  focusElement: (elementId: string) => void;
  handleKeyboardNavigation: (event: KeyboardEvent) => void;
}

export const useAccessibility = (): UseAccessibilityReturn => {
  const announcementsRef = useRef<HTMLDivElement>(null);

  // Fonction pour annoncer des messages aux lecteurs d'écran
  const announceToScreenReader = useCallback((message: string) => {
    if (announcementsRef.current) {
      announcementsRef.current.textContent = message;
      // Vider le contenu après un court délai pour permettre de nouvelles annonces
      setTimeout(() => {
        if (announcementsRef.current) {
          announcementsRef.current.textContent = '';
        }
      }, 1000);
    }
  }, []);

  // Fonction pour focaliser un élément
  const focusElement = useCallback((elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.focus();
      announceToScreenReader(`Focalisé sur ${element.textContent || elementId}`);
    }
  }, [announceToScreenReader]);

  // Gestion de la navigation au clavier
  const handleKeyboardNavigation = useCallback((event: KeyboardEvent) => {
    // Raccourci pour aller au contenu principal
    if (event.altKey && event.key === 'm') {
      event.preventDefault();
      focusElement('main-content');
    }
    
    // Raccourci pour annoncer la page actuelle
    if (event.altKey && event.key === 'p') {
      event.preventDefault();
      const pageTitle = document.title;
      announceToScreenReader(`Page actuelle : ${pageTitle}`);
    }
  }, [focusElement, announceToScreenReader]);

  // Ajouter les écouteurs d'événements au montage
  useEffect(() => {
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    return () => {
      document.removeEventListener('keydown', handleKeyboardNavigation);
    };
  }, [handleKeyboardNavigation]);

  return {
    announceToScreenReader,
    focusElement,
    handleKeyboardNavigation
  };
}; 