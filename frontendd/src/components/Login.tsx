import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { Button } from './Button.tsx';

export default function Login() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 1) Authentification
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2) Récupération du profil Firestore lié à cet utilisateur
      const userDocRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userDocRef);
      if (userSnap.exists()) {
        const profileData = userSnap.data();
        // TODO: utilisez profileData dans votre contexte ou state global
        console.log('Profil utilisateur chargé :', profileData);
      } else {
        console.warn('Aucun profil trouvé pour l’utilisateur', user.uid);
      }

      // 3) Redirection
      navigate('/home', { replace: true });
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert('Une erreur est survenue');
      }
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
