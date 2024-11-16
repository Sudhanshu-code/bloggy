import React, { useState } from "react";
import authServices from "../firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input } from "../components/index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const createAccount = async (data) => {
    setError("");
    try {
      const user = await authServices.signup(data);
      if (user) {
        const userData = authServices.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const googleLogin = async () => {
    const user = await authServices.loginWithGoogle();
    if (user) {
      const userData = authServices.getCurrentUser();
      if (userData) dispatch(storeLogin(userData));
      navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border dark:bg-slate-600 border-black/10`}
      >
        <h2 className="text-center text-2xl font-bold dark:text-white leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base dark:text-white text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form className="mt-4" onSubmit={handleSubmit(createAccount)}>
          <div className="space-y-5">
            <Input
              label="Full Name: "
              placeholder="Enter your name "
              {...register("name", { required: true })}
            />
            <Input
              label="Email Id: "
              placeholder="Enter your email id "
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password:"
              placeholder="Enter your password "
              type="password"
              {...register("password", { required: true })}
            />
            <Button type="submit" text="Signup" className="w-full" />
          </div>
        </form>

        <Button text="Continue With Google" id="google" onClick={googleLogin} />
      </div>
    </div>
  );
}

export default SignUp;
