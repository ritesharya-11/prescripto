import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const AllApointments = () => {

  const {aToken, appointments, getAllAppointments, cancelAppointment} = useContext(AdminContext)
  const {calculateAge, slotDateFormat, currency} = useContext(AppContext)

  useEffect(()=>{
    if (aToken) {
      getAllAppointments()
    }
  },[aToken])

  return (
    <div className="w-full max-w-6xl m-5 md:m-8 animate-fade-in-up">
      <h1 className="text-xl font-extrabold text-gray-900 tracking-tight mb-5">All Appointments</h1>

      <div className="bg-white border border-gray-100 rounded-3xl text-sm max-h-[82vh] min-h-[60vh] overflow-y-auto shadow-xl shadow-gray-100/50 overflow-hidden flex flex-col">
        
        {/* Table Header */}
        <div className="hidden sm:grid grid-cols-[0.5fr_3.5fr_1fr_3.5fr_3.5fr_1.5fr_1.5fr] py-4.5 px-6 border-b border-gray-100 bg-gray-50/50 text-gray-400 font-bold uppercase tracking-wider text-[11px]">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p className="text-center">Action</p>
        </div>

        {/* Table Body */}
        <div className="flex flex-col flex-1">
          {appointments.map((item, index) => (
            <div className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3.5fr_1fr_3.5fr_3.5fr_1.5fr_1.5fr] items-center text-gray-600 py-4.5 px-6 border-b border-gray-55 last:border-b-0 hover:bg-gray-50/30 transition-colors" key={index}>
              <p className="max-sm:hidden font-bold text-gray-400">{index + 1}</p>
              <div className="flex items-center gap-3">
                <img className="w-9 h-9 rounded-xl object-cover border border-gray-100 shadow-2xs" src={item.userData.image} alt={item.userData.name} />
                <p className="text-gray-900 font-bold">{item.userData.name}</p>
              </div>
              <p className="max-sm:hidden font-semibold">{calculateAge(item.userData.dob)}</p>
              <p className="font-medium text-gray-700">{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
              <div className="flex items-center gap-3">
                <img className="w-9 h-9 rounded-xl bg-primary-light/45 object-cover border border-gray-100 shadow-2xs" src={item.docData.image} alt={item.docData.name} />
                <p className="text-gray-900 font-bold">{item.docData.name}</p>
              </div>
              <p className="font-extrabold text-gray-800">{currency}{item.amount}</p>
              <div className="flex items-center justify-center">
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
          
          {appointments.length === 0 && (
            <div className="py-16 flex flex-col items-center justify-center text-center my-auto">
              <span className="text-4xl mb-3">📅</span>
              <p className="text-gray-500 font-semibold text-lg">No Appointments Recorded</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllApointments
