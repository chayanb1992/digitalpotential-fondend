import React, { useEffect, useState } from "react";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase/Firebase.init";
import { AuthContex } from "./AuthContex";
import axios from "axios";
// import { auth } from "../Firebase/Firebase.init";
// import { AuthContex } from "./AuthContex";
const provider = new GoogleAuthProvider();

const ContexProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState();
  useEffect(() => {
    const unsubscrib = onAuthStateChanged(auth, (currentUser) => {
      // Only set user if email is verified
      if (currentUser && currentUser.emailVerified) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false); // always stop loading
    });

    return () => unsubscrib();
  }, []);

  // 2️⃣ Fetch backend user data when Firebase user is ready
  useEffect(() => {
    const fetchUserData = async () => {
      if (!loading && user?.email) {
        try {
          const res = await axios.get(
            `https://web-production-33681.up.railway.app/users/${user.email}/`,
          );
          setUserData(res.data);
        } catch (error) {
          console.error("Failed to fetch backend user:", error);
          setUserData(null);
        }
      }
    };

    fetchUserData();
  }, [user, loading]);
  console.log(userData);

  const createAccount = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logOut = () => {
    return signOut(auth);
  };

  const updateUserProfile = (name, url) => {
    return updateProfile(user, { displayName: name, photoURL: url });
  };
  const signWithGoogle = () => {
    return signInWithPopup(auth, provider);
  };
  const passwordReset = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  // const authData = { user, createAccount, loading };

  const authData = {
    user,
    userData,
    createAccount,
    loading,
    setLoading,
    login,
    logOut,
    updateUserProfile,
    signWithGoogle,
    passwordReset,
  };
  return <AuthContex.Provider value={authData}>{children}</AuthContex.Provider>;
};

export default ContexProvider;
