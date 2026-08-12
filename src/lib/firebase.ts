import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
import config from '../../firebase-applet-config.json';
import { PortfolioData } from '../types';

const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = config.firestoreDatabaseId && config.firestoreDatabaseId !== '(default)'
  ? getFirestore(app, config.firestoreDatabaseId)
  : getFirestore(app);

const PORTFOLIO_DOC_REF = doc(db, 'portfolio', 'main');

export async function getFirebasePortfolio(): Promise<PortfolioData | null> {
  try {
    const snap = await getDoc(PORTFOLIO_DOC_REF);
    if (snap.exists()) {
      return snap.data() as PortfolioData;
    }
  } catch (error) {
    console.error('Error fetching from Firebase Firestore:', error);
  }
  return null;
}

export async function saveFirebasePortfolio(data: PortfolioData): Promise<boolean> {
  try {
    await setDoc(PORTFOLIO_DOC_REF, {
      ...data,
      updatedAt: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error('Error saving to Firebase Firestore:', error);
    return false;
  }
}

export function subscribeToFirebasePortfolio(callback: (data: PortfolioData) => void): () => void {
  return onSnapshot(PORTFOLIO_DOC_REF, (snap) => {
    if (snap.exists()) {
      const data = snap.data() as PortfolioData;
      callback(data);
    }
  }, (error) => {
    console.error('Firebase snapshot listener error:', error);
  });
}
