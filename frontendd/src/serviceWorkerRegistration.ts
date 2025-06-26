// Cette fonction enregistre le service worker
export function register() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/sw.js`;

      navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
          // Mise à jour automatique du service worker
          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker == null) {
              return;
            }

            installingWorker.onstatechange = () => {
              if (installingWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  // Nouveau contenu disponible
                  console.log('Nouveau contenu disponible; veuillez actualiser.');
                } else {
                  // Tout le contenu est mis en cache pour une utilisation hors ligne
                  console.log('Contenu mis en cache pour une utilisation hors ligne.');
                }
              }
            };
          };
        })
        .catch((error) => {
          console.error('Erreur lors de l\'enregistrement du service worker:', error);
        });
    });
  }
}

// Cette fonction désenregistre le service worker
export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
} 