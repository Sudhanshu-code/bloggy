import React from "react";
import LogoutBtn from "./LogoutBtn";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ThemeToggle from "../components/ThemeToggle";

function Header() {
  // const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const authStatus = user.isUserLoggedIn;
  const userData = user.userData;

  const navigate = useNavigate();

  const menuHandle = () => {
    document.getElementById("toggleMenu").classList.toggle("hidden");
  };

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: authStatus,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <nav className=" w-full h-20   flex items-center justify-between z-10 bg-white dark:bg-gray-800 lg:px-16">
      <Link to="/" className="flex items-center gap-2 font-OpenSans pl-4">
        <div className=" justify-center flex rounded-full w-10 h-10 items-center bg-blue-500 text-center text-white  text-2xl font-bold">
          B
        </div>
        <h2 className="  text-2xl md:text-3xl font-semibold  text-black font-OpenSans dark:text-blue-500 ">
          Bloggy.
        </h2>
      </Link>

      <div className="items-center gap-8 hidden lg:flex">
        {navItems.map((item) =>
          item.active ? (
            <li
              className="font-semibold text-black dark:text-white hover:text-blue-500 dark:hover:text-black transition all duration-100 tracking-wide list-none "
              key={item.name}
            >
              <button
                onClick={() => navigate(item.slug)}
                className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
              >
                {item.name}
              </button>
            </li>
          ) : null
        )}
      </div>
      <div className=" gap-3 items-center hidden lg:flex ">
        <ThemeToggle />

        {authStatus && <LogoutBtn />}
        <div className="  text-3xl">
          {userData?.photoUrl ? (
            <img className="rounded-full w-12 " src={userData.photoUrl} />
          ) : null}
        </div>
      </div>

      <button className="lg:hidden pr-4 dark:text-white" onClick={menuHandle}>
        <MenuIcon />
      </button>
      <div
        id="toggleMenu"
        className="dark:bg-gray-800 bg-white lg:hidden hidden  fixed w-full "
      >
        <div className="flex justify-between h-20 pl-4">
          <Link to="/" className="flex items-center gap-2 font-OpenSans">
            <div className=" justify-center flex rounded-full w-10 h-10 items-center bg-blue-500 text-center text-white dark:text-blue-500 dark:bg-white  text-2xl font-bold">
              B
            </div>
            <h2 className="  text-2xl md:text-3xl font-semibold  text-black font-OpenSans dark:text-white">
              Bloggy.
            </h2>
          </Link>
          <button onClick={menuHandle} className="pr-4">
            <CloseIcon className="dark:text-white" />
          </button>
        </div>
        <div
          id="mobileMenu"
          className="h-auto w-1/2 dark:bg-black bg-white transition-all duration-300 absolute right-0 rounded-lg m-5 z-[999] shadow-xl"
        >
          <div className="items-center gap-8" onClick={menuHandle}>
            {navItems.map((item) =>
              item.active ? (
                <li
                  className="font-semibold text-black dark:text-white hover:text-blue-500 dark:hover:text-black transition all duration-100 tracking-wide list-none "
                  key={item.name}
                >
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
          </div>
          <div className=" border m-3 "></div>

          <div className="px-6 py-2">
            <ThemeToggle className="mb-2" />
            {authStatus && <LogoutBtn />}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
