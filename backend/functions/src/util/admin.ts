import admin from 'firebase-admin'
import {firestore} from "firebase-admin/lib/firestore";
import Firestore = firestore.Firestore;

admin.initializeApp();

export const db: Firestore = admin.firestore();

export default admin
