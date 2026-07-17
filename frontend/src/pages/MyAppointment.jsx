import React, { useContext } from 'react'
import {AppContext} from '../context/AppContext'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const MyAppointment = () => {

  const {backendUrl, token, getDoctorsData} = useContext(AppContext)

  const [appointments,setAppointments] = useState([])
  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_")
    return dateArray[0]+" " + months[Number(dateArray[1])] + " " + dateArray[2]
  }
  
  const navigate = useNavigate()

  const getUserAppointments = async () => {
    try {

      const {data} = await axios.get(backendUrl+'/api/user/appointments',{headers:{token}})

      if (data.success) {
        setAppointments(data.appointments.reverse())
        console.log(data.appointments);
        
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {

    try {

      const {data} = await axios.post(backendUrl + '/api/user/cancel-appointment', {appointmentId},{headers:{token}})
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }

  }

  const initPay = (order) => {

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description:'Appointment Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response)

        try {

          const {data} = await axios.post(backendUrl+'/api/user/verifyRazorpay',response,{headers:{token}})
          if (data.success) {
            getUserAppointments()
            navigate('/my-appointments')
          }
          
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
        
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()

  }

  const appointmentRazorpay = async (appointmentId) => {

    try {

      const {data} = await axios.post(backendUrl+'/api/user/payment-razorpay',{appointmentId},{headers:{token}})

      if (data.success) {

        initPay(data.order)
        
      }
      
    } catch (error) {
      
    }

  }

  useEffect(()=> {
    if (token) {
      getUserAppointments()
    }
  },[token])

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-xl shadow-gray-100/50 animate-fade-in-up mt-8">
      <h2 className="text-xl font-extrabold text-gray-900 tracking-tight border-b border-gray-50 pb-4 mb-4">
        My Appointments
      </h2>
      <div className="flex flex-col">
          {appointments.map((item, index) => (
            <div className="flex flex-col sm:flex-row gap-6 py-6 border-b border-gray-100 last:border-b-0" key={index}>
              <div className="w-28 h-28 rounded-2xl overflow-hidden bg-primary-light/35 border border-gray-100 shrink-0">
                <img className="w-full h-full object-cover" src={item.docData.image} alt={item.docData.name} />
              </div>
              
              <div className="flex-1 text-sm text-gray-600 flex flex-col justify-center">
                <p className="text-gray-900 font-extrabold text-base leading-tight hover:text-primary transition-colors cursor-pointer">{item.docData.name}</p>
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mt-0.5">{item.docData.speciality}</p>
                
                <div className="mt-2.5 text-xs text-gray-400">
                  <span className="font-bold text-gray-500">Address: </span>
                  <span>{item.docData.address.line1}</span>
                  {item.docData.address.line2 && <span>, {item.docData.address.line2}</span>}
                </div>
                
                <div className="mt-3">
                  <span className="text-xs font-bold text-gray-700 bg-gray-50/80 border border-gray-100 px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5">
                    📅 {slotDateFormat(item.slotDate)} | ⏰ {item.slotTime}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col gap-2.5 sm:min-w-48 justify-center shrink-0">
                {!item.cancelled && item.payment && !item.isCompleted && (
                  <span className="w-full py-2.5 text-center text-xs font-bold bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-xl cursor-default shadow-2xs">
                    Paid
                  </span>
                )}
                {!item.cancelled && !item.payment && !item.isCompleted && (
                  <button 
                    onClick={() => appointmentRazorpay(item._id)} 
                    className="w-full py-2.5 text-center text-xs font-bold bg-primary hover:bg-primary-hover text-white rounded-xl shadow-md shadow-primary/10 transition-all active:scale-95 cursor-pointer"
                  >
                    Pay Online
                  </button>
                )}
                {!item.cancelled && !item.isCompleted && (
                  <button 
                    onClick={() => cancelAppointment(item._id)} 
                    className="w-full py-2.5 text-center text-xs font-bold border border-gray-200 text-gray-500 hover:bg-red-50 hover:text-red-500 hover:border-red-100 rounded-xl transition-all active:scale-95 cursor-pointer"
                  >
                    Cancel Appointment
                  </button>
                )}
                {item.cancelled && !item.isCompleted && (
                  <span className="w-full py-2.5 text-center text-xs font-bold bg-red-50 border border-red-100 text-red-500 rounded-xl cursor-default shadow-2xs">
                    Appointment Cancelled
                  </span>
                )}
                {item.isCompleted && (
                  <span className="w-full py-2.5 text-center text-xs font-bold bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-xl cursor-default shadow-2xs">
                    Completed
                  </span>
                )}
              </div>
            </div>
          ))}
          
          {appointments.length === 0 && (
            <div className="py-16 flex flex-col items-center justify-center text-center bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
              <span className="text-4xl mb-3">📅</span>
              <p className="text-gray-500 font-semibold text-lg">No Appointments Booked Yet</p>
              <p className="text-gray-400 text-sm mt-1">Check back once you have confirmed an appointment with a doctor.</p>
            </div>
          )}
      </div>
    </div>
  );
}

export default MyAppointment
