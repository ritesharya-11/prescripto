import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center gap-4 my-24 text-gray-900 md:mx-10 animate-fade-in-up">
      <div className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
        🌟 Trusted Experts
      </div>
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight text-center">Top Doctors to Book</h2>
      <p className="sm:w-1/2 text-center text-sm text-gray-500 leading-relaxed">
        Simply browse through our extensive list of trusted doctors, and book your appointment easily.
      </p>
      
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pt-10 px-3 sm:px-0">
        {doctors.slice(0, 10).map((item, index) => {
          const rating = index % 3 === 0 ? "4.9" : index % 3 === 1 ? "4.8" : "4.7";
          const reviews = index % 3 === 0 ? "142" : index % 3 === 1 ? "98" : "115";
          
          return (
            <div
              onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0); }}
              className="bg-white border border-gray-100/80 rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl shadow-2xs flex flex-col group relative"
              key={index}
            >
              {/* Badges on Image */}
              <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5">
                {item.available ? (
                  <span className="bg-emerald-500 text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md shadow-sm">
                    Online
                  </span>
                ) : (
                  <span className="bg-gray-400 text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md shadow-sm">
                    Offline
                  </span>
                )}
                <span className="bg-primary/95 text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md shadow-sm">
                  Available Today
                </span>
              </div>

              {/* Doctor Photo */}
              <div className="relative overflow-hidden bg-primary-light/35 aspect-square">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={item.image} alt={item.name} />
              </div>

              {/* Card Details */}
              <div className="p-5 flex flex-col gap-3 flex-1">
                <div>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-500 mb-1">
                    <span>★</span>
                    <span className="text-gray-900">{rating}</span>
                    <span className="text-gray-400 font-medium">({reviews} reviews)</span>
                  </div>
                  
                  <p className="text-gray-900 text-base font-extrabold group-hover:text-primary transition-colors leading-tight">
                    {item.name}
                  </p>
                  
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1 font-semibold">
                    <span>{item.degree}</span>
                    <span>•</span>
                    <span className="text-primary">{item.speciality}</span>
                  </div>
                </div>

                {/* Additional Medical Cards metrics */}
                <div className="flex items-center justify-between border-t border-gray-50 pt-3 mt-1.5 text-xs">
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Experience</p>
                    <p className="text-gray-700 font-extrabold mt-0.5">{item.experience}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Consultation Fee</p>
                    <p className="text-gray-900 font-black mt-0.5">${item.fees}</p>
                  </div>
                </div>

                {/* Book Now Action Trigger Button */}
                <button className="w-full bg-primary hover:bg-primary-hover text-white text-xs font-bold py-2.5 rounded-xl mt-1.5 shadow-xs transition-all duration-300 active:scale-95 cursor-pointer">
                  Book Now
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className="border border-gray-200 text-gray-600 hover:text-primary hover:border-primary hover:bg-primary-light/20 px-12 py-3.5 rounded-full mt-14 transition-all font-bold cursor-pointer shadow-xs active:scale-95"
      >
        View All Doctors
      </button>
    </div>
  );
};

export default TopDoctors;
