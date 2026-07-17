import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from '../../context/AdminContext'
import {toast} from 'react-toastify'
import axios from "axios";

const AddDoctor = () => {

  const [docImg, setDocImg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('General physician')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')

  const { backendUrl, aToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {

      if (!docImg) {
        return toast.error('Image Not Selected')
      }

      const formData = new FormData() 

      formData.append('image',docImg)
      formData.append('name',name)
      formData.append('email',email)
      formData.append('password',password)
      formData.append('experience',experience)
      formData.append('fees',Number(fees))
      formData.append('about',about)
      formData.append('speciality',speciality)
      formData.append('degree',degree)
      formData.append('address',JSON.stringify({line1:address1, line2:address2}))

      // console log formData
      formData.forEach((value,key) => {
        console.log(`${key} : ${value}`);
      })

      const { data} = await axios.post(backendUrl + '/api/admin/add-doctor',formData, {headers:{aToken}})

      if (data.success) {
        toast.success(data.message)
        setDocImg(false)
        setName('')
        setPassword('')
        setEmail('')
        setAddress1('')
        setAddress2('')
        setDegree('')
        setAbout('')
        setFees('')
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }

  }

  return (
    <form onSubmit={onSubmitHandler} className="m-5 md:m-8 w-full max-w-4xl animate-fade-in-up">
      <h1 className="text-xl font-extrabold text-gray-900 tracking-tight mb-5">Add Doctor</h1>

      <div className="bg-white px-8 py-10 border border-gray-100 rounded-3xl w-full shadow-xl shadow-gray-100/50 max-h-[82vh] overflow-y-auto flex flex-col gap-6">
        
        {/* Profile Pic Upload */}
        <div className="flex items-center gap-4 text-gray-400 font-semibold cursor-pointer">
          <label htmlFor="doc-img" className="relative group cursor-pointer w-20 h-20 rounded-full overflow-hidden border-2 border-dashed border-gray-200 hover:border-primary transition-colors flex items-center justify-center bg-gray-50/50">
            <img 
              className="w-full h-full object-cover group-hover:opacity-75 transition-opacity" 
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} 
              alt="Upload Avatar" 
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-[10px] font-bold">Change</span>
            </div>
          </label>
          <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider leading-tight">
            Upload doctor<br /><span className="text-primary-hover font-extrabold">picture</span>
          </p>
        </div>

        {/* Form Inputs Grid */}
        <div className="flex flex-col lg:flex-row items-start gap-8 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="w-full flex flex-col">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Doctor Name</label>
              <input onChange={(e) => setName(e.target.value)} value={name} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 bg-gray-50/30 focus:bg-white focus:border-primary focus:ring-3 focus:ring-primary/5 outline-none transition-all duration-200" type="text" placeholder="Dr. John Doe" required />
            </div>

            <div className="w-full flex flex-col">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Doctor Email</label>
              <input onChange={(e) => setEmail(e.target.value)} value={email} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 bg-gray-50/30 focus:bg-white focus:border-primary focus:ring-3 focus:ring-primary/5 outline-none transition-all duration-200" type="email" placeholder="john@wellora.com" required />
            </div>

            <div className="w-full flex flex-col">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Doctor Password</label>
              <input onChange={(e) => setPassword(e.target.value)} value={password} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 bg-gray-50/30 focus:bg-white focus:border-primary focus:ring-3 focus:ring-primary/5 outline-none transition-all duration-200" type="password" placeholder="••••••••" required />
            </div>

            <div className="w-full flex flex-col">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Experience</label>
              <select onChange={(e) => setExperience(e.target.value)} value={experience} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 bg-gray-50/30 focus:bg-white focus:border-primary focus:ring-3 focus:ring-primary/5 outline-none transition-all duration-200 cursor-pointer">
                {[...Array(10).keys()].map(i => (
                  <option key={i} value={`${i + 1} Year`}>{i + 1} Year{i > 0 ? 's' : ''}</option>
                ))}
              </select>
            </div>

            <div className="w-full flex flex-col">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Fees (Currency Symbol Included)</label>
              <input onChange={(e) => setFees(e.target.value)} value={fees} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 bg-gray-50/30 focus:bg-white focus:border-primary focus:ring-3 focus:ring-primary/5 outline-none transition-all duration-200" type="number" placeholder="Fees amount" required />
            </div>
          </div>

          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="w-full flex flex-col">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Speciality</label>
              <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 bg-gray-50/30 focus:bg-white focus:border-primary focus:ring-3 focus:ring-primary/5 outline-none transition-all duration-200 cursor-pointer">
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div className="w-full flex flex-col">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Education / Degree</label>
              <input onChange={(e) => setDegree(e.target.value)} value={degree} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 bg-gray-50/30 focus:bg-white focus:border-primary focus:ring-3 focus:ring-primary/5 outline-none transition-all duration-200" type="text" placeholder="e.g. MBBS, MD" required />
            </div>

            <div className="w-full flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-0.5">Clinic Address</label>
              <input onChange={(e) => setAddress1(e.target.value)} value={address1} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 bg-gray-50/30 focus:bg-white focus:border-primary focus:ring-3 focus:ring-primary/5 outline-none transition-all duration-200" type="text" placeholder="Address line 1" required />
              <input onChange={(e) => setAddress2(e.target.value)} value={address2} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 bg-gray-50/30 focus:bg-white focus:border-primary focus:ring-3 focus:ring-primary/5 outline-none transition-all duration-200" type="text" placeholder="Address line 2" required />
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">About Doctor</label>
          <textarea onChange={(e) => setAbout(e.target.value)} value={about} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 bg-gray-50/30 focus:bg-white focus:border-primary focus:ring-3 focus:ring-primary/5 outline-none transition-all duration-200 resize-none" placeholder="Write a short description about the doctor's background, expertise, and clinics..." rows={5} required></textarea>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="bg-primary hover:bg-primary-hover text-white px-10 py-3.5 rounded-full text-sm font-bold shadow-md shadow-primary/10 transition-all active:scale-95 cursor-pointer">Add doctor</button>
        </div>
      </div>
    </form>
  );
};

export default AddDoctor;
