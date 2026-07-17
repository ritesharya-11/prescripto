import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="animate-fade-in-up">
      <div className="text-center text-2xl pt-10 text-gray-400 font-medium tracking-wide">
        <p>
          CONTACT <span className="text-gray-800 font-extrabold">US</span>
        </p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12 items-center justify-center bg-white border border-gray-100 p-8 sm:p-10 rounded-3xl shadow-xl shadow-gray-100/50 max-w-4xl mx-auto mb-28">
        <img className="w-full md:max-w-[340px] rounded-2xl border border-gray-100 shadow-md" src={assets.contact_image} alt="Contact Us" />
        <div className="flex flex-col justify-center items-start gap-5 text-sm text-gray-500 leading-relaxed font-medium">
          <p className="font-extrabold text-lg text-gray-900 tracking-tight">Our OFFICE</p>
          <p className="text-gray-500">54709 Willms Station <br /> Suite 350, Washington, USA</p>
          <p className="text-gray-500">Tel: (415) 555‑0132 <br />Email: contact@wellora.com</p>
          
          <div className="border-t border-gray-50 pt-4 w-full flex flex-col items-start gap-4">
            <div>
              <p className="font-extrabold text-lg text-gray-900 tracking-tight">Careers at WELLORA</p>
              <p className="text-gray-500 mt-1">Learn more about our teams and job openings.</p>
            </div>
            <button className="border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-3 rounded-full text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-xs">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
