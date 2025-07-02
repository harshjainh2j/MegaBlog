import { Button, Input } from "./index.js";
import { useNavigate,Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice.js";
import authService from "../Appwrite/auth.js";
import {Logo} from "./index.js";
import { useState } from "react";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const handlelogin = async (data) => {
    setError(""); // Reset the error message on submit
    try {
      const session = await authService.loginUser(data);
      if (session) {
        const currentUser = await authService.getAccount();
        dispatch(login({ currentUser }));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
      console.log("Error in login", error);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px] text-black">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight text-black">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-500 mt-8 text-center ">{error}</p>}
        <form onSubmit={handleSubmit(handlelogin)} className="mt-8">
          <div className="space-y-5">
            <Input label="email" placeholder="Enter your email" type="email" {...register("email",{required:true,validate:{matchPattern:(value)=> /^\S+@\S+$/.test(value) || 'Invalid email'}})}/>
            <Input type="ppassword" placeholder="Enter Your Password" label="Password" {...register("password",{required:true})}/>
            <Button type="submit" className="w-full">Sign in</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
