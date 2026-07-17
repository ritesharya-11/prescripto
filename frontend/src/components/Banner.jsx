import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Banner = () => {

    const navigate = useNavigate()

  return (
    <div className="flex bg-gradient-to-br from-primary to-indigo-600 rounded-3xl px-6 sm:px-10 md:px-14 lg:px-16 my-24 md:mx-10 shadow-xl shadow-primary/15 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-60 h-60 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>

      {/* ---------------   Left Side   --------------------- */}
      <div className="flex-1 py-10 sm:py-12 md:py-20 lg:py-24 z-10">
        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
          <p>Book Appointment</p>
          <p className="mt-2 text-indigo-100">With 100+ Trusted Doctors</p>
        </div>
        <button 
          onClick={() => { navigate('/login'); scrollTo(0, 0); }} 
          className="bg-white text-sm sm:text-base text-primary hover:text-primary-hover font-semibold px-8 py-3.5 rounded-full mt-8 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer"
        >
          Create account
        </button>
      </div>

      {/* ---------------   Right Side   --------------------- */}
      <div className="hidden md:block md:w-1/2 lg:w-[350px] relative">
        <img className="w-full absolute bottom-0 right-0 max-w-sm object-contain h-auto" src={assets.appointment_img} alt="Appointment" />
      </div>
    </div>
  );
};

export default Banner;
