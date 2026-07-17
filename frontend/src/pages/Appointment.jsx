import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const navigate = useNavigate()

  const [docInfo, setDocInfo] = useState(null);
  const [docSlot, setDocSlot] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlot = async () => {
    if (!docInfo) {
      return;
    }
    setDocSlot([]);

    //  getting current date
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      // getting data with index
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate()+i)

      // settings end time of the date with index
      let endTime = new Date()
      endTime.setDate(today.getDate()+i)
      endTime.setHours(21,0,0,0)

      // setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30: 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})

        let day = currentDate.getDate()
        let month = currentDate.getMonth()+1
        let year = currentDate.getFullYear()

        const slotDate = day +"_" + month +"_" + year
        const slotTime = formattedTime

        const isSlotAvailable = docInfo.slots_booked && docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true
        if (isSlotAvailable) {
          // add slot to array
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime
        })
        }

        

        // Increment current time by 30 minuts
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      setDocSlot(prev => ([...prev, timeSlots]))
    }

  }

  const bookAppointment = async () => {

    if (!token) {
      toast.warn('Login to book appointment')
      return navigate('/login')
    }

    // Added Code
    if (!slotTime) {
    toast.error('Please select a time slot')
    return
  }

    try {

      if (!docSlot[slotIndex] || !docSlot[slotIndex][0]) {
        toast.error('No slot available on this day')
        return
      }
      const date = docSlot[slotIndex][0].datetime

      let day = date.getDate()
      let month = date.getMonth()+1
      let year = date.getFullYear()

      const slotDate = day +"_" + month +"_" + year

      const {data} = await axios.post(backendUrl + '/api/user/book-appointment',{docId,slotDate,slotTime},{headers:{token}})
      if (data.success) {
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-appointments')
      } else {
        toast.error(data.message)
      }
       
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlot();
  }, [docInfo]);

  useEffect(()=>{
    console.log(docSlot)
  },[docSlot])

  return (
    docInfo && (
      <div className="animate-fade-in-up flex flex-col gap-6">
        {/* --------------- Doctor Details  ---------------- */}
        <div className="flex flex-col sm:flex-row gap-6 bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-xs relative">
          <div className="w-full sm:max-w-72 bg-primary-light/35 rounded-2xl overflow-hidden aspect-square sm:aspect-auto border border-gray-100">
            <img
              className="w-full h-full object-cover"
              src={docInfo.image}
              alt={docInfo.name}
            />
          </div>

          <div className="flex-1 flex flex-col gap-3.5 justify-center">
            {/* ------------ Doc Info : name, degree, experience ---------------- */}
            <div className="flex flex-col gap-1.5">
              <p className="flex items-center gap-2 text-2xl md:text-3xl font-extrabold text-gray-900">
                {docInfo.name}
                <img className="w-5 h-5" src={assets.verified_icon} alt="Verified" />
              </p>
              <div className="flex flex-wrap items-center gap-2.5 text-sm">
                <span className="bg-primary-light text-primary font-bold px-3 py-1 rounded-full text-xs">
                  {docInfo.degree} - {docInfo.speciality}
                </span>
                <span className="border border-gray-200 text-gray-500 font-semibold px-2.5 py-0.5 rounded-full text-xs">
                  {docInfo.experience}
                </span>
              </div>
            </div>

            {/* ----------- Doctor About ---------------- */}
            <div className="border-t border-gray-50 pt-3">
              <p className="flex items-center gap-1 text-sm font-bold text-gray-800">
                About <img className="w-3.5" src={assets.info_icon} alt="Info" />
              </p>
              <p className="text-sm text-gray-500 leading-relaxed max-w-[650px] mt-1.5">
                {docInfo.about}
              </p>
            </div>

            <div className="border-t border-gray-50 pt-3 mt-1">
              <p className="text-sm font-semibold text-gray-500">
                Appointment fee:{" "}
                <span className="text-gray-900 font-extrabold text-lg ml-1">
                  {currencySymbol}{docInfo.fees}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* ----------- Booking Slots ------------- */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-xs flex flex-col gap-4">
          <p className="text-gray-800 font-extrabold text-lg">Select Date & Time</p>
          
          {/* Date Selector */}
          <div className="flex items-center gap-3 w-full overflow-x-auto scrollbar-none py-2">
            {docSlot.length > 0 && docSlot.map((item, index) => (
              <div 
                key={index} 
                className={`text-center py-4 px-5 min-w-16 rounded-2xl cursor-pointer transition-all duration-200 flex flex-col gap-1 shadow-2xs ${slotIndex === index ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-102' : 'bg-white border border-gray-100 text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}
                onClick={() => setSlotIndex(index)}
              >
                <p className="text-xs uppercase tracking-wider font-bold opacity-80">{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p className="text-lg font-extrabold leading-none">{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))}
          </div>

          {/* Time Selector */}
          <div className="flex items-center gap-2.5 w-full overflow-x-auto scrollbar-none py-2">
            {docSlot.length > 0 && docSlot[slotIndex] && docSlot[slotIndex].map((item, index) => (
              <p 
                key={index}
                className={`text-sm font-semibold flex-shrink-0 px-5 py-2.5 rounded-full cursor-pointer transition-all duration-200 shadow-2xs ${item.time === slotTime ? 'bg-primary text-white border-primary shadow-md shadow-primary/10' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50 hover:text-gray-700'}`}
                onClick={() => setSlotTime(item.time)}
              >
                {item.time.toLowerCase()}
              </p>
            ))}
            
            {docSlot.length > 0 && (!docSlot[slotIndex] || docSlot[slotIndex].length === 0) && (
              <p className="text-sm text-red-500 font-semibold py-1">No slots available for this day.</p>
            )}
          </div>

          {/* Book Appointment Button */}
          <button 
            onClick={bookAppointment} 
            className="bg-primary text-white hover:bg-primary-hover font-bold text-sm px-12 py-3.5 rounded-full mt-4 cursor-pointer shadow-md shadow-primary/15 transition-all active:scale-95 self-start"
          >
            Confirm & Book Appointment
          </button>
        </div>

        {/* ---------- Listing Related Doctors ------------- */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;
