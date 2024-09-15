import React from "react";
import LogoutBtn from "./LogoutBtn";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { darkMode, lightMode } from "../../store/themeSlice";

function Header() {
  // const navigate = useNavigate();
  const themeMode = useSelector((state) => state.theme.themeMode);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const authStatus = user.isUserLoggedIn;
  const userData = user.userData;

  const navigate = useNavigate();

  const changeTheme = (e) => {
    const currentStatus = e.currentTarget.checked;
    if (currentStatus) {
      dispatch(darkMode());
    } else {
      dispatch(lightMode());
    }
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
    <nav className=" w-full h-20 px-10 mb-7 flex items-center justify-between z-10 bg-white dark:bg-gray-800 lg:px-20 sm:px-16">
      <Link to="/" className="flex items-center gap-2 font-OpenSans">
        <div className=" justify-center flex rounded-full w-10 h-10 items-center bg-blue-500 text-center text-white  text-2xl font-bold">
          B
        </div>
        <h2 className="  text-2xl md:text-3xl font-semibold  text-black font-OpenSans dark:text-blue-500 ">
          Bloggy.
        </h2>
      </Link>

      <div className="items-center gap-8 hidden md:flex">
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
        <div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              onChange={changeTheme}
              checked={themeMode === "dark"}
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full  after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white dark:after:bg-gray-600 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white"></div>
          </label>
        </div>

        {authStatus && <LogoutBtn />}
        <div className="  text-3xl">
          {userData?.photoUrl ? (
            <img className="rounded-full w-12 " src={userData.photoUrl} />
          ) : null}
        </div>
      </div>
    </nav>
  );
}

export default Header;
