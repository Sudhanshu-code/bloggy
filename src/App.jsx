import { useEffect, useState } from "react";

import "./App.css";
// import Signup from "./components/Signup";
// import Post from "./components/Post";
import Header from "./components/header/Header";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./store/authSlice";
import Footer from "./components/footer/Footer";
import { auth } from "./firebase/firebase.js";
import { Outlet } from "react-router";

function App() {
  const [loading, setLoading] = useState(true);
  const themeMode = useSelector((state) => state.theme.themeMode);

  // const [user, setUser] = useState(false)

  const dispatch = useDispatch();

  useEffect(() => {
    const html = document.querySelector("html").classList;
    html.remove("dark", "light");
    html.add(themeMode);
  }, [themeMode]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          login({
            userId: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    setLoading(false);
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-slate-100 dark:bg-[#121212]">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
