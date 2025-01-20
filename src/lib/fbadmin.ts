import { config } from "dotenv";
import { cert, initializeApp, ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

config();

const serviceAccount: ServiceAccount = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  privateKey: process.env.AUTH_FIREBASE_PRIVATE_KEY!,
  clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL,
};
if (
  !serviceAccount.projectId ||
  !serviceAccount.privateKey ||
  !serviceAccount.clientEmail
) {
  throw new Error(
    "Missing Firebase configuration values. Check your .env file."
  );
}

export const admin = initializeApp({
  credential: cert(serviceAccount),
});

export const db = getFirestore(admin);
