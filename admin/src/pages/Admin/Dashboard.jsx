import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {

  const {aToken, getDashData, cancelAppointment, dashData} = useContext(AdminContext)

  const {slotDateFormat} = useContext(AppContext)

  useEffect(()=>{

    if (aToken) {
      getDashData()
    }

  },[aToken])

  return dashData && (
    <div className="m-5 md:m-8 animate-fade-in-up">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-2xs hover:shadow-md transition-all duration-300 cursor-pointer">
          <div className="w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center shrink-0 border border-primary/5">
            <img className="w-8" src={assets.doctor_icon} alt="Doctors" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-gray-900 leading-none">{dashData.doctors}</p>
            <p className="text-gray-400 text-xs font-semibold tracking-wider uppercase mt-1.5">Doctors</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-2xs hover:shadow-md transition-all duration-300 cursor-pointer">
          <div className="w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center shrink-0 border border-primary/5">
            <img className="w-8" src={assets.appointments_icon} alt="Appointments" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-gray-900 leading-none">{dashData.appointments}</p>
            <p className="text-gray-400 text-xs font-semibold tracking-wider uppercase mt-1.5">Appointments</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-2xs hover:shadow-md transition-all duration-300 cursor-pointer">
          <div className="w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center shrink-0 border border-primary/5">
            <img className="w-8" src={assets.patients_icon} alt="Patients" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-gray-900 leading-none">{dashData.patients}</p>
            <p className="text-gray-400 text-xs font-semibold tracking-wider uppercase mt-1.5">Patients</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-3xl mt-10 shadow-xs overflow-hidden">
        <div className="flex items-center gap-2.5 px-6 py-5 border-b border-gray-100 bg-gray-50/50">
          <img className="w-5 h-5" src={assets.list_icon} alt="" />
          <p className="font-extrabold text-gray-800 tracking-wide text-sm">Latest Bookings</p>
        </div>
        
        <div className="flex flex-col">
          {dashData.latestAppointments.map((item, index) => (
            <div className="flex items-center px-6 py-4.5 gap-4 border-b border-gray-50 last:border-b-0 hover:bg-gray-50/30 transition-colors" key={index}>
              <img className="rounded-xl w-11 h-11 object-cover border border-gray-100 shadow-2xs" src={item.docData.image} alt={item.docData.name} />
              <div className="flex-1 text-sm">
                <p className="text-gray-900 font-extrabold">{item.docData.name}</p>
                <p className="text-gray-400 text-xs font-semibold mt-0.5">Booking for {slotDateFormat(item.slotDate)}</p>
              </div>
              <div className="shrink-0">
                {item.cancelled ? (
                  <span className="bg-red-50 text-red-500 border border-red-100 text-xs font-bold px-3 py-1 rounded-full">
                    Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-bold px-3 py-1 rounded-full">
                    Completed
                  </span>
                ) : (
                  <img 
                    onClick={() => cancelAppointment(item._id)} 
                    className="w-8 h-8 p-1.5 rounded-full hover:bg-red-50 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-transparent hover:border-red-100" 
                    src={assets.cancel_icon} 
                    alt="Cancel" 
                  />
                )}
              </div>
            </div>
          ))}
          
          {dashData.latestAppointments.length === 0 && (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <span className="text-3xl mb-2">📋</span>
              <p className="text-gray-500 font-semibold text-base">No Bookings Yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard
