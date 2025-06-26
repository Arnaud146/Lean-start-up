// src/services/auth.ts
import { auth } from '../firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  UserCredential,
} from 'firebase/auth';

/**
 * Inscrit un utilisateur avec email/mot de passe et lui fixe son displayName.
 */
export async function signUpWithEmail(
  email: string,
  password: string,
  username: string
): Promise<UserCredential> {
  // 1) Création du compte dans Firebase Auth
  const userCred = await createUserWithEmailAndPassword(auth, email, password);

  // 2) Mise à jour du displayName
  await updateProfile(userCred.user, {
    displayName: username
  });

  return userCred;
}

/**
 * Connexion avec email et mot de passe.
 */
export function signInWithEmail(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}
