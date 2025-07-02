import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { login } from "../store/authSlice.js";
import { Button, Input, Logo } from "./index.js";
import authService from "../Appwrite/auth";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleSubmit, register } = useForm();
  const [error, setError] = useState("");
  const handlesignup = async (data) => {
    setError("");
    try {
      const createUser = await authService.createAccount(data);
      if (createUser) {
       await authService.loginUser({ email: data.email, password: data.password });
        const currentUser = await authService.getAccount();
        if (currentUser) {
          dispatch(login(currentUser ));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
      console.log("Error in signup", error);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10 text-black`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight text-black">
          Login in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have any account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Login
          </Link>
        </p>
        {error && <p className="text-red-500 mt-8 text-center ">{error}</p>}
        <form onSubmit={handleSubmit(handlesignup)}>
          <div className="space-y-5">
            <Input
              label="Email"
              type="email"
              placeholder="Enter Email"
              {...register("email", { required: true })}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter Password"
              {...register("password", { required: true })}
            />
            <Button type="submit" className="w-full">
              Sign up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
