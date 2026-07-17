import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext'

const Login = () => {

    const [state,setState] = useState('Admin')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const {setAToken, backendUrl} = useContext(AdminContext)
    const{setDToken} = useContext(DoctorContext)

    const onSubmitHandler = async (event) => {

      event.preventDefault()

      try {

        if (state === 'Admin') {
          
          const {data} = await axios.post(backendUrl + '/api/admin/login',{email,password})
          if (data.success) {
            localStorage.setItem('aToken',data.token)
            setAToken(data.token);
          } else {
            toast.error(data.message)
          }

        } else {

          const {data} = await axios.post(backendUrl + '/api/doctor/login', {email, password})
          if (data.success) {
            localStorage.setItem('dToken',data.token)
            setDToken(data.token)
            console.log(data.token)
          } else {
            toast.error(data.message)
          }

        }

      } catch (error) {

      }

    }



  return (
    <form onSubmit={onSubmitHandler} className="min-h-[85vh] flex items-center justify-center animate-fade-in-up">
        <div className="flex flex-col gap-5 m-auto p-8 sm:p-10 w-full max-w-md bg-white border border-gray-100 rounded-3xl text-gray-600 text-sm shadow-xl shadow-gray-100/50">
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight text-center">
              <span className="text-primary font-extrabold">{state}</span> Login
            </h2>
            <p className="text-gray-400 font-medium text-center -mt-2">Welcome to the Wellora management console</p>
            
            <div className="w-full flex flex-col">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Email Address</label>
              <input 
                onChange={(e) => setEmail(e.target.value)} 
                value={email} 
                placeholder="e.g. admin@wellora.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 bg-gray-50/30 focus:bg-white focus:border-primary focus:ring-3 focus:ring-primary/10 outline-none transition-all duration-200" 
                type="email" 
                required 
              />
            </div>
            
            <div className="w-full flex flex-col">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Password</label>
              <input 
                onChange={(e) => setPassword(e.target.value)} 
                value={password} 
                placeholder="••••••••"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 bg-gray-50/30 focus:bg-white focus:border-primary focus:ring-3 focus:ring-primary/10 outline-none transition-all duration-200" 
                type="password" 
                required 
              />
            </div>
            
            <button className="bg-primary hover:bg-primary-hover text-white w-full py-3.5 mt-2 rounded-xl text-sm font-bold shadow-md shadow-primary/10 transition-all active:scale-98 cursor-pointer">
              Login
            </button>
            
            <div className="text-center w-full mt-2 text-sm text-gray-400 font-medium">
              {state === 'Admin' ? (
                <p>
                  Doctor Login?{" "}
                  <span className="text-primary font-bold hover:underline cursor-pointer ml-0.5" onClick={() => setState('Doctor')}>
                    Click here
                  </span>
                </p>
              ) : (
                <p>
                  Admin Login?{" "}
                  <span className="text-primary font-bold hover:underline cursor-pointer ml-0.5" onClick={() => setState('Admin')}>
                    Click here
                  </span>
                </p>
              )}
            </div>
        </div>
    </form>
  );
}

export default Login
