import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { Button } from './Button.tsx';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Connexion réussie !');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4 bg-white rounded-2xl shadow">
      <h2 className="text-xl font-semibold text-center">Connexion</h2>
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
      <Button type="submit" className="w-full">Se connecter</Button>
    </form>
  );
}