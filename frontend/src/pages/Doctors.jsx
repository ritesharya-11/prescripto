import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { doctors } from "../assets/assets";

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter,setShowFilter] = useState(false)
  const navigate = useNavigate();


  const { doctors } = useContext(AppContext);


  const appplyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    appplyFilter();
  }, [doctors, speciality]);

  return (
    <div className="animate-fade-in-up">
      <p className="text-gray-500 font-medium mb-6">Browse through the doctors by speciality.</p>
      <div className="flex flex-col sm:flex-row items-start gap-6">
        <button 
          className={`w-full sm:w-auto py-2.5 px-5 border border-gray-200 rounded-xl text-sm font-semibold transition-all sm:hidden shadow-xs cursor-pointer flex items-center justify-center gap-2 ${showFilter ? 'bg-primary border-primary text-white shadow-md' : 'bg-white text-gray-700'}`} 
          onClick={() => setShowFilter(prev => !prev)}
        >
          {showFilter ? 'Hide Filters' : 'Show Filters'} 🔍
        </button>
        
        <div className={`w-full sm:w-auto flex-col gap-3 text-sm text-gray-600 ${showFilter ? 'flex animate-in fade-in slide-in-from-top-4 duration-200' : 'hidden sm:flex'}`}>
          {[
            'General physician',
            'Gynecologist',
            'Dermatologist',
            'Pediatricians',
            'Neurologist',
            'Gastroenterologist'
          ].map((spec) => {
            const isActive = speciality === spec;
            return (
              <p 
                key={spec}
                onClick={() => speciality === spec ? navigate('/doctors') : navigate(`/doctors/${spec}`)} 
                className={`w-[94vw] sm:w-48 md:w-56 pl-4 py-2.5 pr-4 border rounded-xl transition-all cursor-pointer font-semibold ${isActive ? "bg-primary-light text-primary border-primary/20 shadow-xs" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
              >
                {spec}
              </p>
            );
          })}
        </div>
        
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filterDoc.map((item, index) => (
            <div
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-lg shadow-xs flex flex-col group"
              key={index}
            >
              <div className="relative overflow-hidden bg-primary-light/35 aspect-square">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={item.image} alt={item.name} />
              </div>
              <div className="p-5 flex flex-col gap-2.5 flex-1">
                <div className="flex items-center gap-2">
                  {item.available ? (
                    <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      Available
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 bg-gray-50 text-gray-500 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-gray-400"></span>
                      Not Available
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-gray-900 text-base font-bold group-hover:text-primary transition-colors leading-tight">
                    {item.name}
                  </p>
                  <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mt-1">{item.speciality}</p>
                </div>
              </div>
            </div>
          ))}
          
          {filterDoc.length === 0 && (
            <div className="col-span-full py-16 flex flex-col items-center justify-center text-center bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
              <span className="text-4xl mb-3">👨‍⚕️</span>
              <p className="text-gray-500 font-semibold text-lg">No Doctors Found</p>
              <p className="text-gray-400 text-sm mt-1">Try selecting another speciality category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
