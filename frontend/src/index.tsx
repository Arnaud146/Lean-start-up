import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './tailwind.css';
import { subscribeNotifications } from './push.ts';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

subscribeNotifications();