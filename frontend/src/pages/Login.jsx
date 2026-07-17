import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from 'axios'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const {backendUrl, token, setToken} = useContext(AppContext)
  const navigate = useNavigate()

  const [state, setState] = useState("Sign Up");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {

      if (state === 'Sign Up') {

        const {data} = await axios.post(backendUrl + '/api/user/register', {name,password,email})
        if (data.success) {
          localStorage.setItem('token',data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
        
      } else {

        const {data} = await axios.post(backendUrl + '/api/user/login', {password,email})
        if (data.success) {
          localStorage.setItem('token',data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }

      }
      
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=> {
    if (token) {
      navigate('/')
    }
  },[token])

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[75vh] flex items-center justify-center animate-fade-in-up">
      <div className="flex flex-col gap-5 m-auto p-8 sm:p-10 w-full max-w-md bg-white border border-gray-100 rounded-3xl text-gray-600 text-sm shadow-xl shadow-gray-100">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            {state === "Sign Up" ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-gray-400 font-medium mt-1">
            Please {state === "Sign Up" ? "sign up" : "log in"} to book an appointment
          </p>
        </div>

        {state === "Sign Up" && (
          <div className="w-full flex flex-col">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Full Name</label>
            <input
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 bg-gray-50/30 focus:bg-white focus:border-primary focus:ring-3 focus:ring-primary/10 outline-none transition-all duration-200"
              type="text"
              placeholder="e.g. John Doe"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
        )}

        <div className="w-full flex flex-col">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Email Address</label>
          <input
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 bg-gray-50/30 focus:bg-white focus:border-primary focus:ring-3 focus:ring-primary/10 outline-none transition-all duration-200"
            type="email"
            placeholder="e.g. john@example.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        
        <div className="w-full flex flex-col">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Password</label>
          <input
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 bg-gray-50/30 focus:bg-white focus:border-primary focus:ring-3 focus:ring-primary/10 outline-none transition-all duration-200"
            type="password"
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        <button 
          type="submit" 
          className="bg-primary hover:bg-primary-hover text-white w-full py-3.5 mt-2 rounded-xl text-sm font-bold shadow-md shadow-primary/10 transition-all active:scale-98 cursor-pointer"
        >
          {state === "Sign Up" ? "Create account" : "Login"}
        </button>

        <div className="text-center w-full mt-2 text-sm text-gray-400 font-medium">
          {state === "Sign Up" ? (
            <p>
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-primary font-bold hover:underline cursor-pointer ml-0.5"
              >
                Login here
              </span>
            </p>
          ) : (
            <p>
              Create a new account?{" "}
              <span
                onClick={() => setState("Sign Up")}
                className="text-primary font-bold hover:underline cursor-pointer ml-0.5"
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </div>
    </form>
  );
};

export default Login;
