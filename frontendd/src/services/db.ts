import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { auth } from '../firebaseConfig';
import type { OnboardingData } from '../components/onboarding/Onboarding';

const db = getFirestore();

export async function saveUserProfile(data: OnboardingData) {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("Utilisateur non connecté");
  await setDoc(doc(db, 'users', uid), data, { merge: true });
}

export async function getUserProfile(): Promise<OnboardingData | null> {
  const uid = auth.currentUser?.uid;
  if (!uid) return null;
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? (snap.data() as OnboardingData) : null;
}
