import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './tailwind.css';
import './firebaseConfig.js';
import * as serviceWorkerRegistration from './serviceWorkerRegistration.ts';
//import { subscribeNotifications } from './push.ts';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// Enregistrement du service worker
serviceWorkerRegistration.register();

//subscribeNotifications(;