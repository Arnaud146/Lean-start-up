import React, { useEffect, useRef } from 'react';

interface ScreenReaderAnnouncerProps {
  message: string;
  priority?: 'polite' | 'assertive';
  onAnnounce?: () => void;
}

export const ScreenReaderAnnouncer: React.FC<ScreenReaderAnnouncerProps> = ({
  message,
  priority = 'polite',
  onAnnounce
}) => {
  const announcerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (message && announcerRef.current) {
      announcerRef.current.textContent = message;
      
      // Déclencher l'annonce
      if (onAnnounce) {
        onAnnounce();
      }

      // Vider le contenu après un délai pour permettre de nouvelles annonces
      const timer = setTimeout(() => {
        if (announcerRef.current) {
          announcerRef.current.textContent = '';
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [message, onAnnounce]);

  return (
    <div
      ref={announcerRef}
      aria-live={priority}
      aria-atomic="true"
      className="sr-only"
      role="status"
      aria-label="Annonces pour lecteur d'écran"
    />
  );
}; 