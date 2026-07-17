import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const Navbar = () => {

    const {aToken,setAToken} = useContext(AdminContext)
    const {dToken,setDToken} = useContext(DoctorContext)

    const navigate = useNavigate()

    const logout = () => {
        navigate('/')
        aToken && setAToken('')
        aToken && localStorage.removeItem('aToken')
        dToken && setDToken('')
        dToken && localStorage.removeItem('dToken')
    }

  return (
    <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 flex justify-between items-center px-6 sm:px-10 py-4 transition-all duration-300">
      <div className="flex items-center gap-3">
        <img onClick={() => navigate('/')} className="w-36 sm:w-40 cursor-pointer hover:opacity-90 transition-opacity" src={assets.admin_logo} alt="Wellora Logo" />
        <span className="border px-2.5 py-0.5 rounded-full border-primary/20 bg-primary-light text-primary font-bold text-[10px] sm:text-xs uppercase tracking-wide">
          {aToken ? 'Administrator' : 'Doctor'}
        </span>
      </div>
      <button 
        onClick={logout} 
        className="bg-primary hover:bg-primary-hover text-white text-xs font-bold px-8 py-2.5 rounded-full cursor-pointer shadow-md shadow-primary/10 transition-all active:scale-95"
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar
