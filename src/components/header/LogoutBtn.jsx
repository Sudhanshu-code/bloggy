import React from "react";
import authServices from "../../firebase/auth";
import { logout } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

function LogoutBtn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function logoutHandler() {
    authServices.logout().then(() => {
      dispatch(logout());
      navigate("/login");
    });
  }
  return (
    <button
      onClick={logoutHandler}
      className=" border-black rounded-sm dark:border-white text-black dark:text-white border-2 px-7 py-1 bg-transparent font-medium hover:bg-black hover:text-blue-500 transition all duration-300"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
