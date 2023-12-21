// AuthProvider.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  Auth,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

interface AuthContextProps {
  signUp: (email: string, password: string) => Promise<void>;
  logIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  user: Auth['currentUser'] | null;
  firebaseAccessToken: string | null;
  imgurAccessToken: string | null; // Nuevo campo para el token de Imgur
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Auth['currentUser'] | null>(null);
  const [firebaseAccessToken, setFirebaseAccessToken] = useState<string | null>(null);
  const [imgurAccessToken, setImgurAccessToken] = useState<string | null>(null);

  async function signUp(email: string, password: string) {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Error al registrarse:', error.message);
    }
  }

  async function logIn(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
    }
  }

  async function logOut() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
    }
  }

  async function signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error al autenticarse con Google:', error.message);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        currentUser.getIdTokenResult(true).then((tokenResult) => {
          const token = tokenResult.token;
          setFirebaseAccessToken(token);
        }).catch((error) => {
          console.error('Error al obtener el token de Firebase:', error.message);
        });
      } else {
        setFirebaseAccessToken(null);
        setImgurAccessToken(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const contextValue: AuthContextProps = {
    signUp,
    logIn,
    logOut,
    signInWithGoogle,
    user,
    firebaseAccessToken,
    imgurAccessToken,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthContextProvider');
  }
  return context;
}
