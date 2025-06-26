// sendCustomNotificationExample.js
// Exemple d'utilisation du SDK Firebase Functions dans React

import { getFunctions, httpsCallable } from 'firebase/functions';
import { messaging } from '../firebaseConfig.js'; 

// Initialisation des fonctions Firebase
const functionsApp = getFunctions();

// Référence à la Cloud Function 'sendCustomNotification'
const sendCustomNotification = httpsCallable(functionsApp, 'sendCustomNotification');

/**
 * Envoie une notification de test à un token FCM donné
 * @param {string} token FCM obtenu via subscribeNotifications()
 */
export async function testSendNotification(token) {
  try {
    const result = await sendCustomNotification({
      token,
      title: 'Test Handy’s',
      body: 'Notification de test !'
    });
    console.log('Succès :', result);
  } catch (error) {
    console.error('Erreur functions :', error);
  }
}

// Exécution exemple (décommentez et remplacez par votre token)
// testSendNotification('VOTRE_TOKEN_FCM');

// Pour tester directement depuis la console du navigateur :
if (typeof window !== 'undefined') {
  window.testSendNotification = testSendNotification;
  console.log('Vous pouvez maintenant appeler testSendNotification("VOTRE_TOKEN_FCM") dans la console');
}
