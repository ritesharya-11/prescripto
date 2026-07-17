import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="md:mx-10 mt-36">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-12 py-12 text-sm border-t border-gray-100">
        {/* --------- Left Section -------------- */}
        <div className="flex flex-col gap-4">
            <img className="w-36 hover:opacity-90 transition-opacity" src={assets.logo} alt="Wellora" />
            <p className="w-full md:w-3/4 text-gray-500 leading-relaxed">Simply browse through our extensive list of trusted doctors, schedule your appointments hassle-free, and manage your health seamlessly with Wellora.</p>
        </div>

        {/* --------- Center Section -------------- */}
        <div>
            <p className="text-xs font-bold text-gray-800 tracking-widest uppercase mb-5">COMPANY</p>
            <ul className="flex flex-col gap-2.5 text-gray-500 font-medium">
                <li className="hover:text-primary transition-colors cursor-pointer">Home</li>
                <li className="hover:text-primary transition-colors cursor-pointer">About us</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Contact us</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Privacy policy</li>
            </ul>
        </div>

        {/* --------- Right Section -------------- */}
        <div>
            <p className="text-xs font-bold text-gray-800 tracking-widest uppercase mb-5">GET IN TOUCH</p>
            <ul className="flex flex-col gap-2.5 text-gray-500 font-medium">
                <li className="hover:text-primary transition-colors cursor-pointer">+1-212-456-7890</li>
                <li className="hover:text-primary transition-colors cursor-pointer">contact@wellora.com</li>
            </ul>
        </div>
      </div>
      {/* --------- Copyright Text------------- */}
      <div className="border-t border-gray-100 py-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-2">
        <p>Copyright © 2026 Wellora - All Rights Reserved.</p>
        <div className="flex gap-4">
          <span className="hover:text-primary cursor-pointer transition-colors">Terms of Service</span>
          <span className="hover:text-primary cursor-pointer transition-colors">Privacy Policy</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
