import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { Button } from './Button.tsx';
import { testSendNotification } from '../utils/sendCustomNotifications.js';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Inscription réussie !');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4 bg-white rounded-2xl shadow">
      <h2 className="text-xl font-semibold text-center">Inscription</h2>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary"
        required
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Mot de passe"
        className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary"
        required
      />
      <Button type="submit" className="w-full">S'inscrire</Button>
    </form>
  );
}