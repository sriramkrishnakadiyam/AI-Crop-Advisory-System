import app from './config.js';
import { 
    getStorage, 
    ref, 
    uploadBytes, 
    getDownloadURL 
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-storage.js";

const storage = getStorage(app);

// Upload a file to Firebase Storage
export const uploadFile = async (path, file) => {
    try {
        const storageRef = ref(storage, path);
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return { url: downloadURL, error: null };
    } catch (error) {
        return { url: null, error: error.message };
    }
};

// Get download URL for an existing file
export const getFileUrl = async (path) => {
    try {
        const storageRef = ref(storage, path);
        const downloadURL = await getDownloadURL(storageRef);
        return { url: downloadURL, error: null };
    } catch (error) {
        return { url: null, error: error.message };
    }
};

export { storage };
