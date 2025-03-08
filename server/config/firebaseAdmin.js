import admin from 'firebase-admin';
import dotenv from 'dotenv';
import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const initializeFirebase = () => {
  const require = createRequire(import.meta.url);
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const serviceAccountPath = path.resolve(__dirname, process.env.FIREBASE_SERVICE_ACCOUNT_PATH);

  try {
    const serviceAccount = require(serviceAccountPath);  
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

  } catch (error) {
    throw new Error('Firebase initialization failed');
  }
};

initializeFirebase();

const auth = admin.auth();  

const db = admin.firestore();


export { auth,db };
