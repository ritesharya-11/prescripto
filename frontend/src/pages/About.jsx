import React from "react";
import { assets, doctors } from "../assets/assets";

const About = () => {
  return (
    <div className="animate-fade-in-up">
      <div className="text-center text-2xl pt-10 text-gray-400 font-medium tracking-wide">
        <p>
          ABOUT <span className="text-gray-800 font-extrabold">US</span>
        </p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12 items-center">
        <img
          className="w-full md:max-w-[360px] rounded-3xl border border-gray-100 shadow-md"
          src={assets.about_image}
          alt="About Us"
        />
        <div className="flex flex-col justify-center gap-6 md:w-3/5 text-sm text-gray-500 leading-relaxed font-medium">
          <p>
            Welcome to Wellora, your trusted partner in managing your
            healthcare needs conveniently and efficiently. At Wellora, we
            understand the challenges individuals face when it comes to
            scheduling doctor appointments and managing their health records.
          </p>
          <p>
            Wellora is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service. Whether you're booking your first appointment or managing
            ongoing care, Wellora is here to support you every step of the
            way.
          </p>
          <div className="border-t border-gray-50 pt-4">
            <h3 className="text-gray-900 font-extrabold text-base">Our Vision</h3>
            <p className="mt-1">
              Our vision at Wellora is to create a seamless healthcare
              experience for every user. We aim to bridge the gap between patients
              and healthcare providers, making it easier for you to access the
              care you need, when you need it.
            </p>
          </div>
        </div>
      </div>

      <div className="text-xl my-6 text-gray-400 font-medium tracking-wide">
        <p>
          WHY <span className="text-gray-800 font-extrabold">CHOOSE US</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-20">
        <div className="border border-gray-100 bg-white hover:bg-primary rounded-3xl px-8 py-10 flex flex-col gap-4 text-sm text-gray-500 hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg shadow-2xs cursor-pointer flex-1 group">
          <b className="text-gray-900 group-hover:text-white text-base">Efficiency:</b>
          <p className="leading-relaxed">Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>
        <div className="border border-gray-100 bg-white hover:bg-primary rounded-3xl px-8 py-10 flex flex-col gap-4 text-sm text-gray-500 hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg shadow-2xs cursor-pointer flex-1 group">
          <b className="text-gray-900 group-hover:text-white text-base">Convenience:</b>
          <p className="leading-relaxed">Access to a network of trusted healthcare professionals in your area.</p>
        </div>
        <div className="border border-gray-100 bg-white hover:bg-primary rounded-3xl px-8 py-10 flex flex-col gap-4 text-sm text-gray-500 hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg shadow-2xs cursor-pointer flex-1 group">
          <b className="text-gray-900 group-hover:text-white text-base">Personalization:</b>
          <p className="leading-relaxed">Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>
    </div>
  );
};

export default About;

