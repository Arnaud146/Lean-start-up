import React, { useState } from 'react';
import { Button } from './Button.tsx';

interface AccessibilityInfoProps {
  className?: string;
}

export const AccessibilityInfo: React.FC<AccessibilityInfoProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const shortcuts = [
    { key: 'Alt + M', description: 'Aller au contenu principal' },
    { key: 'Alt + P', description: 'Annoncer la page actuelle' },
    { key: 'Tab', description: 'Naviguer entre les éléments' },
    { key: 'Entrée', description: 'Activer un bouton ou lien' },
    { key: 'Espace', description: 'Activer un bouton' },
  ];

  return (
    <div className={className}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        ariaLabel="Afficher les informations d'accessibilité"
        aria-expanded={isOpen}
        aria-controls="accessibility-info"
        className="text-xs"
      >
        ♿ Accessibilité
      </Button>
      
      {isOpen && (
        <div
          id="accessibility-info"
          className="absolute bottom-16 right-4 bg-background border rounded-lg shadow-lg p-4 max-w-sm z-50"
          role="dialog"
          aria-label="Informations d'accessibilité"
        >
          <h3 className="font-semibold mb-3">Raccourcis clavier</h3>
          <ul className="space-y-2 text-sm">
            {shortcuts.map((shortcut, index) => (
              <li key={index} className="flex justify-between">
                <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">
                  {shortcut.key}
                </kbd>
                <span className="ml-3">{shortcut.description}</span>
              </li>
            ))}
          </ul>
          
          <div className="mt-4 pt-3 border-t">
            <p className="text-xs text-muted-foreground">
              Cette application est compatible avec les lecteurs d'écran VoiceOver et TalkBack.
            </p>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="mt-3 w-full"
            ariaLabel="Fermer les informations d'accessibilité"
          >
            Fermer
          </Button>
        </div>
      )}
    </div>
  );
}; 