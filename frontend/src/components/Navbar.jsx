import React, { useContext, useState, useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();

  const {token, setToken, userData} = useContext(AppContext)

  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  // const [token, setToken] = useState(true); // this is for temporary use

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const logout = () => {
    setToken(false)
    localStorage.removeItem('token')
    setShowDropdown(false) // Close dropdown after logout
  }

  return (
    <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 flex items-center justify-between text-sm py-4 px-1 mb-8 transition-all duration-300">
      <img onClick={()=>{navigate('/'); scrollTo(0,0);}} className="w-40 cursor-pointer hover:opacity-90 transition-opacity" src={assets.logo} alt="Wellora Logo" />
      
      <ul className="hidden md:flex items-center gap-2.5 font-bold text-xs tracking-wider">
        <NavLink to="/" className={({isActive}) => `px-4 py-2 rounded-full transition-all duration-300 ${isActive ? 'bg-primary text-white shadow-sm shadow-primary/10' : 'text-gray-600 hover:text-primary hover:bg-primary-light/50'}`}>
          <li>HOME</li>
        </NavLink>
        <NavLink to="/doctors" className={({isActive}) => `px-4 py-2 rounded-full transition-all duration-300 ${isActive ? 'bg-primary text-white shadow-sm shadow-primary/10' : 'text-gray-600 hover:text-primary hover:bg-primary-light/50'}`}>
          <li>FIND DOCTORS</li>
        </NavLink>
        <NavLink to="/about" className={({isActive}) => `px-4 py-2 rounded-full transition-all duration-300 ${isActive ? 'bg-primary text-white shadow-sm shadow-primary/10' : 'text-gray-600 hover:text-primary hover:bg-primary-light/50'}`}>
          <li>ABOUT</li>
        </NavLink>
        <NavLink to="/contact" className={({isActive}) => `px-4 py-2 rounded-full transition-all duration-300 ${isActive ? 'bg-primary text-white shadow-sm shadow-primary/10' : 'text-gray-600 hover:text-primary hover:bg-primary-light/50'}`}>
          <li>CONTACT</li>
        </NavLink>
        <a href="https://prescripto-wvls.vercel.app/" target="_blank" rel="noopener noreferrer" className="ml-2 border border-gray-200 hover:border-primary hover:text-primary px-4 py-2 text-xs rounded-full transition-all duration-300 font-bold bg-white shadow-2xs hover:shadow-sm">Admin Panel</a>
      </ul>
      
      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="flex items-center gap-2.5 cursor-pointer relative group" ref={dropdownRef}>
            <img 
              className="w-9 h-9 rounded-full border border-gray-200 object-cover shadow-xs" 
              src={userData.image} 
              alt="Profile Pic"
              onClick={() => setShowDropdown(!showDropdown)}
            />
            <img 
              className="w-2.5 transition-transform duration-200 group-hover:translate-y-0.5" 
              src={assets.dropdown_icon} 
              alt="Dropdown Icon"
              onClick={() => setShowDropdown(!showDropdown)}
            />
            <div className={`absolute top-full right-0 mt-2 text-sm font-medium text-gray-700 z-50 ${showDropdown ? 'block' : 'hidden'}`}>
                <div className="min-w-44 bg-white rounded-xl shadow-xl border border-gray-100 flex flex-col p-2.5 gap-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
                    <p onClick={() => {
                      navigate('/my-profile');
                      setShowDropdown(false);
                    }} className="hover:bg-gray-50 hover:text-primary rounded-lg px-3.5 py-2.5 transition-colors cursor-pointer">My Profile</p>
                    <p onClick={() => {
                      navigate('/my-appointments');
                      setShowDropdown(false);
                    }} className="hover:bg-gray-50 hover:text-primary rounded-lg px-3.5 py-2.5 transition-colors cursor-pointer">My Appointments</p>
                    <hr className="border-gray-100 my-1" />
                    <p onClick={logout} className="hover:bg-red-50 hover:text-red-600 rounded-lg px-3.5 py-2.5 transition-colors cursor-pointer font-semibold">Logout</p>
                </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white hover:bg-primary-hover px-7 py-2.5 rounded-full text-sm font-semibold shadow-md shadow-primary/10 transition-all active:scale-95 hidden md:block cursor-pointer"
          >
            Create account
          </button>
        )}
        
        <button onClick={()=>setShowMenu(true)} className="w-6 md:hidden cursor-pointer hover:opacity-80 transition-opacity">
          <img src={assets.menu_icon} alt="Menu" />
        </button>
        
        {/* ----- Mobile Menu ------- */}
        <div className={`fixed inset-y-0 right-0 z-50 bg-white shadow-2xl transition-all duration-300 flex flex-col ${showMenu ? 'w-full max-w-xs' : 'w-0 overflow-hidden'}`}>
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <img className="w-32" src={assets.logo} alt="Wellora" />
            <button onClick={()=>setShowMenu(false)} className="w-7 cursor-pointer hover:opacity-80 transition-opacity">
              <img src={assets.cross_icon} alt="Close" />
            </button>
          </div>
          <ul className="flex flex-col gap-2 mt-6 px-4 text-base font-semibold text-gray-700">
            <NavLink onClick={()=>setShowMenu(false)} to='/' className="hover:bg-gray-50 hover:text-primary rounded-xl px-4 py-3 transition-colors"><p>Home</p></NavLink>
            <NavLink onClick={()=>setShowMenu(false)} to='/doctors' className="hover:bg-gray-50 hover:text-primary rounded-xl px-4 py-3 transition-colors"><p>ALL DOCTORS</p></NavLink>
            <NavLink onClick={()=>setShowMenu(false)} to='/about' className="hover:bg-gray-50 hover:text-primary rounded-xl px-4 py-3 transition-colors"><p>ABOUT</p></NavLink>
            <NavLink onClick={()=>setShowMenu(false)} to='/contact' className="hover:bg-gray-50 hover:text-primary rounded-xl px-4 py-3 transition-colors"><p>CONTACT</p></NavLink>
            
            <hr className="border-gray-100 my-2" />
            
            {token ? (
              <>
                <NavLink onClick={()=>setShowMenu(false)} to='/my-profile' className="hover:bg-gray-50 hover:text-primary rounded-xl px-4 py-3 transition-colors"><p>My Profile</p></NavLink>
                <NavLink onClick={()=>setShowMenu(false)} to='/my-appointments' className="hover:bg-gray-50 hover:text-primary rounded-xl px-4 py-3 transition-colors"><p>My Appointments</p></NavLink>
                <p onClick={() => { logout(); setShowMenu(false); }} className="hover:bg-red-50 text-red-500 rounded-xl px-4 py-3 transition-colors cursor-pointer">Logout</p>
              </>
            ) : (
              <NavLink onClick={()=>setShowMenu(false)} to='/login' className="mx-4 mt-4 bg-primary text-white text-center hover:bg-primary-hover py-3 rounded-full text-sm font-semibold shadow-md shadow-primary/10 transition-colors">
                <p>Login / Create Account</p>
              </NavLink>
            )}
          </ul>
        </div>
      </div> 
    </div>
  );
};

export default Navbar;





