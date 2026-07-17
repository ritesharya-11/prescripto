import React from 'react'
import {specialityData} from '../assets/assets'
import { Link } from 'react-router-dom'

const specialityDescriptions = {
  'General physician': 'Primary care, family medicine, vaccinations, and comprehensive general health checkups.',
  'Gynecologist': 'Women\'s health, pregnancy, maternity, fertility, and reproductive system care.',
  'Dermatologist': 'Specialized treatment for skin, hair, nails, and advanced cosmetic/anti-aging therapies.',
  'Pediatricians': 'Dedicated medical care, growth tracking, and vaccinations for infants, children, and teens.',
  'Neurologist': 'Expert diagnosis and management of brain, spine, nervous system, and headache disorders.',
  'Gastroenterologist': 'Complete care for digestive systems, stomach, liver, and gastrointestinal tracts.'
};

const SpecialityMenu = () => {
  return (
    <div className="flex flex-col items-center gap-4 py-24 text-gray-800" id="speciality">
      <div className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-700 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
        🩺 Specialized Care
      </div>
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight text-center">
        Browse by Speciality
      </h2>
      <p className="sm:w-1/2 text-center text-sm text-gray-500 leading-relaxed">
        Access our wide network of trusted medical practitioners tailored to your personal health needs.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-10 w-full px-4">
        {specialityData.map((item, index) => (
          <Link 
            onClick={() => scrollTo(0, 0)} 
            className="bg-white border border-gray-100/80 rounded-3xl p-6 flex flex-col items-start gap-3.5 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer"
            key={index} 
            to={`/doctors/${item.speciality}`}
          >
            <div className="w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center border border-primary/5 group-hover:bg-primary group-hover:shadow-md group-hover:shadow-primary/20 transition-all duration-300">
              <img className="w-8 object-contain group-hover:brightness-0 group-hover:invert transition-all duration-300" src={item.image} alt={item.speciality} />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 group-hover:text-primary transition-colors leading-snug">
                {item.speciality}
              </h3>
              <p className="text-xs text-gray-400 font-medium leading-relaxed mt-1">
                {specialityDescriptions[item.speciality] || 'Expert medical care in this field.'}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SpecialityMenu
