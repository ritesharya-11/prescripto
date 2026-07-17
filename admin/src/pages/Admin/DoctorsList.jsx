import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {

  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext)

  useEffect(()=> {
    if (aToken) {
      getAllDoctors()
    }
  },[aToken])

  return (
    <div className="m-5 md:m-8 max-h-[90vh] overflow-y-auto animate-fade-in-up">
      <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">All Doctors</h1>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pt-6">
        {
          doctors.map((item, index) => (
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 group" key={index}>
              <div className="relative overflow-hidden bg-primary-light/35 aspect-square">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={item.image} alt={item.name} />
              </div>
              <div className="p-5 flex flex-col gap-1.5">
                <p className="text-gray-900 text-base font-bold group-hover:text-primary transition-colors leading-tight">{item.name}</p>
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">{item.speciality}</p>
                
                <div className="mt-3.5 pt-3 border-t border-gray-50 flex items-center gap-2 text-xs font-bold text-gray-500">
                  <input 
                    onChange={() => changeAvailability(item._id)} 
                    type="checkbox" 
                    checked={item.available} 
                    className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4 cursor-pointer"
                  />
                  <span className={item.available ? "text-emerald-600" : "text-gray-400"}>Available</span>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default DoctorsList
