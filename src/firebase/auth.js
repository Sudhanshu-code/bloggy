import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

class AuthServices {
  signup = async ({ email, password, name }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
      });

      this.login({ email, password });
      return user;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === "auth/email-already-in-use") {
        alert("This email is already in use. Please try logging in.");
      } else {
        alert(errorMessage);
      }
    }
  };

  login = async ({ email, password }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      return user;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      alert(errorMessage);
    }
  };

  logout = async () => {
    try {
      return await signOut(auth);
    } catch (error) {
      console.log("error loggin out: ", error);
    }
  };

  getCurrentUser = () => {
    try {
      return auth.currentUser;
    } catch (error) {
      console.log("error geting current user: ", error);
    }
  };

  loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      return result.user;
      // const userCredential = GoogleAuthProvider.credentialFromResult(result );
    } catch (error) {
      console.log("error loginWithGoogle: ", error);
    }
  };
}
const authServices = new AuthServices();

export default authServices;
