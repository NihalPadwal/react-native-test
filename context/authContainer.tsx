import {
  AuthContextType,
  AuthFunc,
  LoginFuncPara,
  RegisterFuncPara,
} from "@/types/Auth";
import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "@/firebase.config";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<
    undefined | true | false
  >(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      // console.log("got user", user);
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
        updateUserData(user.uid);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });

    return unsub;
  }, []);

  const updateUserData = async (userid: string) => {
    const docRef = doc(db, "users", userid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let data = docSnap.data();
      setUser({
        ...user,
        username: data.username,
        profileUrl: data.profileUrl,
        userId: data.userId,
      });
    }
  };

  const login = async ({ email, pass }: LoginFuncPara): AuthFunc => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, pass);
      return { success: true };
    } catch (_e) {
      let e = _e as Error;
      let msg = e.message;
      if (msg.includes("(auth/invalid-email)")) {
        msg = "Invalid Email!";
      }
      if (msg.includes("(auth/invalid-credential)")) {
        msg = "Please Enter Correct Credentials";
      }
      return { success: false, msg: msg };
    }
  };

  const logout = async (): AuthFunc => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (e) {
      return { success: false, data: (e as Error).message };
    }
  };

  const register = async ({
    email,
    pass,
    username,
    profileUrl,
  }: RegisterFuncPara) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, pass);
      console.log(`response.user: `, response?.user);

      // setUser(response?.user);
      // setIsAuthenticated(true);

      await setDoc(doc(db, "users", response?.user?.uid), {
        username,
        profileUrl,
        userId: response?.user?.uid,
      });

      return { success: true, data: response?.user };
    } catch (_e) {
      let e = _e as Error;
      let msg = e.message;
      if (msg.includes("(auth/invalid-email)")) {
        msg = "Invalid Email!";
      }
      if (msg.includes("(auth/email-already-in-use)")) {
        msg = "Email Already exists!";
      }

      return { success: false, msg: msg };
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be wrapped inside AuthContextProvider");
  }

  return value;
};
