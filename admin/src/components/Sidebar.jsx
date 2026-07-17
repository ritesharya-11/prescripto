import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'

const Sidebar = () => {
    const {aToken} = useContext(AdminContext)
    const {dToken} = useContext(DoctorContext)
  
  return (
    <div className="min-h-screen bg-white border-r border-gray-100 w-16 md:w-72 shadow-xs transition-all duration-300">
      {
        aToken && <ul className="text-gray-500 mt-6 flex flex-col gap-1.5 px-2.5">
            <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-4 rounded-xl cursor-pointer transition-all duration-200 ${isActive ? 'bg-primary-light text-primary border-r-4 border-primary font-bold shadow-xs' : 'hover:bg-gray-50 hover:text-gray-900 font-medium'}`} to={'/admin-dashboard'}>
                <img className="w-5 h-5 flex-shrink-0" src={assets.home_icon} alt="" />
                <p className="hidden md:block">Dashboard</p>
            </NavLink>
            <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-4 rounded-xl cursor-pointer transition-all duration-200 ${isActive ? 'bg-primary-light text-primary border-r-4 border-primary font-bold shadow-xs' : 'hover:bg-gray-50 hover:text-gray-900 font-medium'}`} to={'/all-appointments'}>
                <img className="w-5 h-5 flex-shrink-0" src={assets.appointment_icon} alt="" />
                <p className="hidden md:block">Appointments</p>
            </NavLink>
            <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-4 rounded-xl cursor-pointer transition-all duration-200 ${isActive ? 'bg-primary-light text-primary border-r-4 border-primary font-bold shadow-xs' : 'hover:bg-gray-50 hover:text-gray-900 font-medium'}`} to={'/add-doctor'}>
                <img className="w-5 h-5 flex-shrink-0" src={assets.add_icon} alt="" />
                <p className="hidden md:block">Add Doctor</p>
            </NavLink>
            <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-4 rounded-xl cursor-pointer transition-all duration-200 ${isActive ? 'bg-primary-light text-primary border-r-4 border-primary font-bold shadow-xs' : 'hover:bg-gray-50 hover:text-gray-900 font-medium'}`} to={'/doctor-list'}>
                <img className="w-5 h-5 flex-shrink-0" src={assets.people_icon} alt="" />
                <p className="hidden md:block">Doctors List</p>
            </NavLink>
        </ul>
      }
      {
        dToken && <ul className="text-gray-500 mt-6 flex flex-col gap-1.5 px-2.5">
            <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-4 rounded-xl cursor-pointer transition-all duration-200 ${isActive ? 'bg-primary-light text-primary border-r-4 border-primary font-bold shadow-xs' : 'hover:bg-gray-50 hover:text-gray-900 font-medium'}`} to={'/doctor-dashboard'}>
                <img className="w-5 h-5 flex-shrink-0" src={assets.home_icon} alt="" />
                <p className="hidden md:block">Dashboard</p>
            </NavLink>
            <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-4 rounded-xl cursor-pointer transition-all duration-200 ${isActive ? 'bg-primary-light text-primary border-r-4 border-primary font-bold shadow-xs' : 'hover:bg-gray-50 hover:text-gray-900 font-medium'}`} to={'/doctor-appointments'}>
                <img className="w-5 h-5 flex-shrink-0" src={assets.appointment_icon} alt="" />
                <p className="hidden md:block">Appointments</p>
            </NavLink>
            <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-4 rounded-xl cursor-pointer transition-all duration-200 ${isActive ? 'bg-primary-light text-primary border-r-4 border-primary font-bold shadow-xs' : 'hover:bg-gray-50 hover:text-gray-900 font-medium'}`} to={'/doctor-profile'}>
                <img className="w-5 h-5 flex-shrink-0" src={assets.people_icon} alt="" />
                <p className="hidden md:block">Profile</p>
            </NavLink>
        </ul>
      }
    </div>
  );
}

export default Sidebar