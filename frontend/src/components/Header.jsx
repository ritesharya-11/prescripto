import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-br from-blue-50/70 via-sky-50/40 to-white rounded-3xl p-8 md:p-12 lg:p-16 border border-blue-100/50 shadow-xl shadow-gray-100/30 relative overflow-hidden animate-fade-in-up">
      {/* Decorative blurred shapes */}
      <div className="absolute top-[-20%] right-[-10%] w-[350px] h-[350px] bg-primary-light/40 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[250px] h-[250px] bg-sky-200/30 rounded-full blur-3xl pointer-events-none -z-10"></div>

      {/* --------- Left Side ------------- */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-6 z-10">
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/10 px-4 py-1.5 rounded-full text-xs text-primary font-extrabold uppercase tracking-wider">
          🛡️ 100% Verified Medical Professionals
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 font-black leading-tight tracking-tight">
          Your Health, <br />
          <span className="bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">Our Priority</span>
        </h1>
        
        <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-lg">
          Simply browse through our extensive list of trusted doctors, read verified reviews, and schedule your appointment hassle-free in just a few clicks.
        </p>

        <div className="flex flex-wrap items-center gap-4 mt-2">
          <a href="#speciality" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-full text-sm font-bold shadow-md shadow-primary/15 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
            Book Appointment
          </a>
          <a href="/doctors" className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-8 py-3.5 rounded-full text-sm font-bold shadow-2xs hover:shadow-xs hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
            Find Doctors
          </a>
        </div>

        {/* Hero Statistics Row */}
        <div className="flex items-center gap-6 mt-8 pt-6 border-t border-gray-100 w-full">
          <div>
            <p className="text-2xl font-black text-gray-900">10k+</p>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-0.5">Happy Patients</p>
          </div>
          <div className="h-8 w-px bg-gray-200/80"></div>
          <div>
            <p className="text-2xl font-black text-gray-900">500+</p>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-0.5">Verified Doctors</p>
          </div>
          <div className="h-8 w-px bg-gray-200/80"></div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1 text-amber-500 text-sm">
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              <span className="text-xs font-bold text-gray-900 ml-1">4.9/5</span>
            </div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">Trust Score</p>
          </div>
        </div>
      </div>

      {/* --------- Right Side ------------- */}
      <div className="md:w-1/2 flex items-center justify-center relative mt-10 md:mt-0 z-10 pl-0 md:pl-8">
        <div className="relative w-full max-w-sm aspect-square md:aspect-auto md:h-[450px] bg-gradient-to-tr from-primary-light/50 to-indigo-100/50 rounded-3xl border border-white/50 shadow-lg overflow-hidden flex items-end">
          <img className="w-full h-auto object-contain max-h-[90%] mx-auto" src={assets.header_img} alt="Doctors Hero" />
          
          {/* Floating Online Badge */}
          <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-md border border-gray-50 flex items-center gap-2 animate-pulse">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-bold text-gray-700">50+ Doctors Online</span>
          </div>
        </div>

        {/* Floating Icons */}
        <div className="absolute -top-3 -left-3 bg-white p-3.5 rounded-2xl shadow-lg border border-gray-50/50 animate-bounce duration-1000 text-xl z-20">❤️</div>
        <div className="absolute bottom-16 -right-3 bg-white p-3.5 rounded-2xl shadow-lg border border-gray-50/50 animate-pulse text-xl z-20">🩺</div>
        <div className="absolute bottom-6 -left-3 bg-white p-3 rounded-2xl shadow-md border border-gray-50/50 text-xl z-20">💊</div>
        <div className="absolute top-12 -right-3 bg-white p-3 rounded-2xl shadow-md border border-gray-50/50 text-xl z-20">📅</div>
      </div>
    </div>
  );
};

export default Header;
