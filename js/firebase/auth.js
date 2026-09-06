import app from './config.js';
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

const auth = getAuth(app);

// Sign up new users
export const registerUser = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return { user: userCredential.user, error: null };
    } catch (error) {
        return { user: null, error: error.message };
    }
};

// Sign in existing users
export const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return { user: userCredential.user, error: null };
    } catch (error) {
        return { user: null, error: error.message };
    }
};

// Sign out user
export const logoutUser = async () => {
    try {
        await signOut(auth);
        return { error: null };
    } catch (error) {
        return { error: error.message };
    }
};

// Listen for authentication state changes
export const observeAuthState = (callback) => {
    onAuthStateChanged(auth, (user) => {
        callback(user);
    });
};

export { auth };
