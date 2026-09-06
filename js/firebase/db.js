import app from './config.js';
import { 
    getFirestore, 
    collection, 
    addDoc, 
    getDocs, 
    query, 
    where 
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

const db = getFirestore(app);

// Add a new document to a specified collection
export const addData = async (collectionName, data) => {
    try {
        const docRef = await addDoc(collection(db, collectionName), data);
        return { id: docRef.id, error: null };
    } catch (error) {
        return { id: null, error: error.message };
    }
};

// Get all documents from a specified collection
export const getAllData = async (collectionName) => {
    try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return { data, error: null };
    } catch (error) {
        return { data: null, error: error.message };
    }
};

// Get documents based on a condition
export const queryData = async (collectionName, field, operator, value) => {
    try {
        const q = query(collection(db, collectionName), where(field, operator, value));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return { data, error: null };
    } catch (error) {
        return { data: null, error: error.message };
    }
};

export { db };
