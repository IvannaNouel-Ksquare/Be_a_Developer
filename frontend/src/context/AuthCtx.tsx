import { useState, createContext, useContext, useEffect } from "react";
import { auth } from "../firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

//Higher order component
interface IAuthContext {
  user: any;
  signUp: (email: string, password: string) => Promise<any>;
  logIn: (email: string, password: string) => Promise<any>;
  logOut: () => any;
  loading: any;
}

let AuthContext = createContext<IAuthContext>(null!);

interface Props {
  children?: JSX.Element;
}

// Type Props to avoid error in the props that we enter
export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const signUp = async (email: string, password: string) => {
    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return newUser;
    } catch (error: any) {
      const errMsg: string = error.message.split(":")[1];
      return errMsg;
    }
  };

  const logIn = async (email: string, password: string) => {
    try {
      const loggedUser = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return loggedUser;
    } catch (error: any) {
      const errMsg: string = error.message.split(":")[1];
      return errMsg;
    }
  };

  const logOut = () => {
    signOut(auth);
  };

  // checks for auth change to update the user
  useEffect(() => {
    onAuthStateChanged(auth, (currUser) => {
      setUser(currUser);
      setLoading(false);
    });
  }, []);

  return (
    // the values ​​will be accessible from the child components
    <AuthContext.Provider value={{ user, signUp, logIn, logOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

// Custom hook
//  facilitates the import of the context in other files and allows us to access its values
export function useAuth() {
  return useContext(AuthContext);
}
