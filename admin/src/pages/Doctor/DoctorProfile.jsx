import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const DoctorProfile = () => {

  const {dToken, profileData, setProfileData, getProfileData, backendUrl} = useContext(DoctorContext)
  const {currency} = useContext(AppContext)

  const [isEdit,setIsEdit] = useState(false)

  const updateProfile = async () => {

    try {

      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available
      }

      const {data} = await axios.post(backendUrl + '/api/doctor/update-profile',updateData,{headers:{dToken}})

      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error(data.message)
      }
      
    } catch (error) {

      toast.error(error.message)
      console.log(error);
      
      
    }

  }

  useEffect(()=>{
    if (dToken) {
      getProfileData()
    }
  },[dToken])

  return profileData && (
    <div className="max-w-4xl m-5 md:m-8 animate-fade-in-up">
      <div className="flex flex-col md:flex-row gap-6 bg-white border border-gray-100 p-6 md:p-8 rounded-3xl shadow-xl shadow-gray-100/50">
        <div className="w-full md:max-w-64 bg-primary-light/35 rounded-2xl overflow-hidden aspect-square md:aspect-auto md:h-64 border border-gray-100 shrink-0">
          <img className="w-full h-full object-cover" src={profileData.image} alt={profileData.name} />
        </div>

        <div className="flex-1 flex flex-col gap-4">
          {/* ---------Doc Info : name, degree, experience-------- */}
          <div className="flex flex-col gap-1.5">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">{profileData.name}</h2>
            <div className="flex flex-wrap items-center gap-2.5 text-sm">
              <span className="bg-primary-light text-primary font-bold px-3 py-1 rounded-full text-xs">
                {profileData.degree} - {profileData.speciality}
              </span>
              <span className="border border-gray-200 text-gray-500 font-semibold px-2.5 py-0.5 rounded-full text-xs">
                {profileData.experience}
              </span>
            </div>
          </div>

          {/* --------Doc About-------- */}
          <div className="border-t border-gray-50 pt-3">
            <p className="text-sm font-bold text-gray-800">About</p>
            <p className="text-sm text-gray-500 leading-relaxed max-w-[650px] mt-1">
              {profileData.about}
            </p>
          </div>

          {/* Fees & Address */}
          <div className="border-t border-gray-50 pt-3 flex flex-col gap-3 text-sm">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Appointment Fee</p>
              {isEdit ? (
                <input 
                  type="number" 
                  onChange={(e) => setProfileData(prev => ({...prev, fees: e.target.value}))} 
                  value={profileData.fees} 
                  className="border border-gray-200 bg-gray-50/30 focus:bg-white focus:border-primary focus:ring-3 focus:ring-primary/5 rounded-xl px-3.5 py-2 text-sm text-gray-850 outline-none transition-all duration-200 mt-1 max-w-xs"
                />
              ) : (
                <p className="text-gray-900 font-extrabold text-base mt-0.5">{currency} {profileData.fees}</p>
              )}
            </div>

            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Address</p>
              {isEdit ? (
                <div className="flex flex-col gap-2 mt-1.5 max-w-xs">
                  <input 
                    type="text" 
                    onChange={(e) => setProfileData(prev => ({...prev, address: {...prev.address, line1: e.target.value}}))} 
                    value={profileData.address.line1} 
                    className="w-full border border-gray-200 bg-gray-50/30 focus:bg-white focus:border-primary focus:ring-3 focus:ring-primary/5 rounded-xl px-3.5 py-2 text-sm text-gray-850 outline-none transition-all duration-200"
                    placeholder="Address Line 1"
                  />
                  <input 
                    type="text" 
                    onChange={(e) => setProfileData(prev => ({...prev, address: {...prev.address, line2: e.target.value}}))} 
                    value={profileData.address.line2} 
                    className="w-full border border-gray-200 bg-gray-50/30 focus:bg-white focus:border-primary focus:ring-3 focus:ring-primary/5 rounded-xl px-3.5 py-2 text-sm text-gray-855 outline-none transition-all duration-200"
                    placeholder="Address Line 2"
                  />
                </div>
              ) : (
                <p className="text-gray-600 font-medium leading-relaxed mt-0.5">
                  {profileData.address.line1}
                  {profileData.address.line2 && <><br />{profileData.address.line2}</>}
                </p>
              )}
            </div>
          </div>

          {/* Availability Toggle */}
          <div className="flex items-center gap-2 text-sm font-bold text-gray-500 pt-2">
            <input 
              onChange={() => isEdit && setProfileData(prev => ({...prev, available: !prev.available}))} 
              checked={profileData.available} 
              type="checkbox" 
              className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4 cursor-pointer"
              disabled={!isEdit}
            />
            <span className={profileData.available ? "text-emerald-600" : "text-gray-400"}>Available for Bookings</span>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-gray-50 flex justify-end">
            {isEdit ? (
              <button 
                onClick={updateProfile} 
                className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-full text-xs font-bold shadow-md shadow-primary/10 transition-all active:scale-95 cursor-pointer"
              >
                Save Profile
              </button>
            ) : (
              <button 
                onClick={() => setIsEdit(true)} 
                className="border border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full text-xs font-bold shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorProfile
