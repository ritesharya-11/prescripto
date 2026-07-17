import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'

const Home = () => {
  const navigate = useNavigate();
  const [searchDocName, setSearchDocName] = useState('');
  const [selectedSpec, setSelectedSpec] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  
  // FAQ state
  const [activeFaq, setActiveFaq] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (selectedSpec) {
      navigate(`/doctors/${selectedSpec}`);
    } else {
      navigate('/doctors');
    }
  };

  const faqs = [
    {
      q: "How do I book an appointment on Wellora?",
      a: "Simply browse through our category listing or search for your doctor, choose a convenient date and time slot, and click 'Confirm & Book Appointment'. You will receive an instant notification."
    },
    {
      q: "Can I cancel or reschedule my bookings?",
      a: "Yes, you can manage all your bookings from the 'My Appointments' tab in your profile dashboard. Cancellations are free up to 2 hours before the scheduled slot."
    },
    {
      q: "Are the doctors on your platform verified?",
      a: "Absolutely. Every doctor on Wellora undergoes a strict verification process checking their degrees, licenses, and clinical backgrounds before they can list."
    },
    {
      q: "Is there any fee for using Wellora?",
      a: "Booking appointments through Wellora is entirely free for patients. You only pay the consultation fee set by the doctor or clinic."
    }
  ];

  const services = [
    { title: "Online Consultation", desc: "Chat with verified doctors instantly from anywhere.", icon: "💬" },
    { title: "Video Consultation", desc: "Face-to-face virtual visits with premium video clarity.", icon: "📹" },
    { title: "Emergency Support", desc: "24/7 hotline and swift healthcare support dispatch.", icon: "🚨" },
    { title: "Medical Records", desc: "Secure digital locker for all your prescriptions and reports.", icon: "📁" },
    { title: "Lab Tests", desc: "Book diagnostic tests online with at-home sample collection.", icon: "🧪" },
    { title: "Health Packages", desc: "Pre-packaged health checkups for you and your family.", icon: "📦" }
  ];

  const testimonials = [
    { name: "Sarah Connor", rating: 5, review: "Wellora has completely changed how I manage scheduling. The appointments are always prompt and verified!", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120" },
    { name: "John Doe", rating: 5, review: "Excellent UI and service! Found a neurologist within minutes and booked an instant video consultation.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120" },
    { name: "David Miller", rating: 5, review: "Highly recommend Wellora. The doctor lists are accurate and the booking process is extremely intuitive.", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120&h=120" }
  ];

  return (
    <div className="flex flex-col gap-10">
      <Header />
      
      {/* 3. Quick Appointment Search */}
      <div className="px-4 -mt-14 sm:-mt-20 z-20 relative">
        <form onSubmit={handleSearch} className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-xl shadow-gray-200/40 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-4">
          <div className="flex-1 w-full flex flex-col">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 ml-1">Search Doctor</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Doctor Name or Keyword" 
                value={searchDocName} 
                onChange={(e) => setSearchDocName(e.target.value)}
                className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:bg-white focus:border-primary focus:ring-3 focus:ring-primary/5 outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex-1 w-full flex flex-col">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 ml-1">Select Speciality</label>
            <select 
              value={selectedSpec} 
              onChange={(e) => setSelectedSpec(e.target.value)}
              className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-700 focus:bg-white focus:border-primary focus:ring-3 focus:ring-primary/5 outline-none transition-all cursor-pointer"
            >
              <option value="">All Specialities</option>
              <option value="General physician">General physician</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatricians">Pediatricians</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
            </select>
          </div>

          <div className="flex-1 w-full flex flex-col">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 ml-1">Preferred Date</label>
            <input 
              type="date" 
              value={selectedDate} 
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-700 focus:bg-white focus:border-primary focus:ring-3 focus:ring-primary/5 outline-none transition-all cursor-pointer"
            />
          </div>

          <button type="submit" className="w-full md:w-auto bg-primary hover:bg-primary-hover text-white font-bold text-sm px-8 py-3.5 rounded-2xl transition-all shadow-md shadow-primary/10 active:scale-95 cursor-pointer self-end mt-2 md:mt-0">
            Search
          </button>
        </form>
      </div>

      {/* 4. Statistics Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-12 border-y border-gray-100 max-w-5xl mx-auto w-full px-4">
        {[
          { label: "Verified Doctors", value: "500+", desc: "Across 20+ disciplines", icon: "👨‍⚕️" },
          { label: "Clinic Partners", value: "50+", desc: "State-of-the-art clinics", icon: "🏥" },
          { label: "Successful Bookings", value: "10,000+", desc: "Hassle-free visits", icon: "📅" },
          { label: "Success Rate", value: "98%", desc: "Patient satisfaction", icon: "⭐" }
        ].map((stat, i) => (
          <div key={i} className="flex flex-col items-center text-center p-4 hover:scale-105 transition-transform duration-300">
            <span className="text-3xl mb-2">{stat.icon}</span>
            <span className="text-3xl font-black text-gray-900 tracking-tight">{stat.value}</span>
            <span className="text-xs font-bold text-gray-800 uppercase tracking-wide mt-1">{stat.label}</span>
            <span className="text-[10px] text-gray-400 mt-0.5">{stat.desc}</span>
          </div>
        ))}
      </div>

      <SpecialityMenu />

      {/* 9. Healthcare Services Grid */}
      <div className="flex flex-col items-center gap-4 py-16 bg-gray-50/40 rounded-3xl p-8 border border-gray-100/50">
        <div className="inline-flex items-center gap-1.5 bg-accent/15 text-accent px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          🛠️ Comprehensive Services
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight text-center">Our Healthcare Services</h2>
        <p className="sm:w-1/2 text-center text-sm text-gray-500 leading-relaxed">
          From diagnostic consultations to video calls, we provide end-to-end medical coverage.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-10 w-full">
          {services.map((serv, index) => (
            <div key={index} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex items-start gap-4 group">
              <span className="text-3xl bg-gray-50 p-3 rounded-2xl group-hover:bg-primary-light transition-colors">{serv.icon}</span>
              <div>
                <h3 className="text-base font-bold text-gray-900 group-hover:text-primary transition-colors">{serv.title}</h3>
                <p className="text-xs text-gray-400 font-medium leading-relaxed mt-1.5">{serv.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <TopDoctors />

      {/* 7. Why Choose Us */}
      <div className="flex flex-col items-center gap-4 py-16">
        <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          💎 Our Features
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight text-center">Why Choose Wellora?</h2>
        <p className="sm:w-1/2 text-center text-sm text-gray-500 leading-relaxed">
          Engineered to offer the absolute best digital patient booking experience in clinical care.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-10 w-full px-4">
          {[
            { title: "Expert Doctors", desc: "Access verified profiles of top medical experts in clinical care.", icon: "👨‍⚕️" },
            { title: "Instant Booking", desc: "Lock in your slots online instantly with automated email reminders.", icon: "⚡" },
            { title: "Secure Payments", desc: "Fully encrypted secure billing integrations supporting cards.", icon: "🛡️" },
            { title: "24x7 Support", desc: "Round-the-clock emergency support line directly with clinicians.", icon: "📞" }
          ].map((item, index) => (
            <div key={index} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-2xs hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center text-center gap-3">
              <span className="text-4xl bg-primary-light/50 p-4 rounded-full">{item.icon}</span>
              <h3 className="text-base font-bold text-gray-900 mt-2">{item.title}</h3>
              <p className="text-xs text-gray-400 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 8. Patient Testimonials Slider/Cards */}
      <div className="flex flex-col items-center gap-4 py-16 bg-gradient-to-tr from-sky-50/50 to-white rounded-3xl p-8 border border-sky-100/50">
        <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          💬 Reviews
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight text-center">What Patients Say</h2>
        <p className="sm:w-1/2 text-center text-sm text-gray-500 leading-relaxed">
          Hear feedback directly from real patients who booked appointments using our platform.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 w-full">
          {testimonials.map((test, index) => (
            <div key={index} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-2xs hover:shadow-md transition-all flex flex-col gap-4 relative">
              <div className="flex items-center gap-3">
                <img className="w-12 h-12 rounded-full object-cover border border-gray-100 shadow-2xs" src={test.img} alt={test.name} />
                <div>
                  <h4 className="text-sm font-extrabold text-gray-900 leading-tight">{test.name}</h4>
                  <div className="flex items-center gap-0.5 text-amber-500 text-xs mt-0.5">
                    {[...Array(test.rating)].map((_, i) => <span key={i}>★</span>)}
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed italic">
                "{test.review}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 10. Download App Section */}
      <div className="bg-gradient-to-br from-primary to-indigo-600 rounded-3xl p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center gap-10 shadow-xl shadow-primary/15 relative overflow-hidden text-white mt-10">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="flex-1 flex flex-col items-start gap-5 z-10">
          <div className="inline-flex items-center gap-1.5 bg-white/15 border border-white/10 px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
            📱 Wellora Mobile App
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Download Our App</h2>
          <p className="text-sm text-indigo-100 leading-relaxed max-w-lg">
            Manage consultations, search local clinics, view health reports, and book slot notifications on-the-go. Available for Android and iOS devices.
          </p>

          <div className="flex items-center gap-4 mt-4">
            <button className="bg-white text-gray-900 hover:bg-gray-100 px-6 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 cursor-pointer shadow-xs active:scale-95 transition-all">
              <span>🤖 Google Play</span>
            </button>
            <button className="bg-white text-gray-900 hover:bg-gray-100 px-6 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 cursor-pointer shadow-xs active:scale-95 transition-all">
              <span>🍏 App Store</span>
            </button>
          </div>
        </div>

        {/* QR Code and Mockup representation */}
        <div className="flex items-center gap-6 z-10 bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10 shadow-lg">
          <div className="bg-white p-2.5 rounded-2xl shadow-xs">
            {/* Simple representation of QR code with canvas/div layout */}
            <div className="w-20 h-20 bg-gray-900 rounded-lg flex flex-wrap p-1 gap-1 items-center justify-center">
              {[...Array(9)].map((_, i) => (
                <div key={i} className={`w-5 h-5 rounded-xs ${i % 2 === 0 ? 'bg-white' : 'bg-transparent'}`}></div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold leading-tight uppercase tracking-wider">Scan to Download</p>
            <p className="text-[10px] text-indigo-200 mt-1 font-medium leading-relaxed">Point your phone camera <br />at the code to download.</p>
          </div>
        </div>
      </div>

      {/* 11. FAQ Accordion */}
      <div className="flex flex-col items-center gap-4 py-16 max-w-3xl mx-auto w-full px-4">
        <div className="inline-flex items-center gap-1.5 bg-primary-light text-primary px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          ❔ FAQ
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight text-center">Frequently Asked Questions</h2>
        <p className="sm:w-1/2 text-center text-sm text-gray-500 leading-relaxed">
          Need quick answers? Read our most commonly asked patient questions below.
        </p>

        <div className="flex flex-col gap-4 pt-10 w-full">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div 
                key={index} 
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-2xs hover:shadow-xs transition-all duration-200"
              >
                <button 
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between font-bold text-sm text-gray-900 focus:outline-none cursor-pointer hover:bg-gray-50/50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="text-base font-semibold text-primary">{isOpen ? "−" : "+"}</span>
                </button>
                <div className={`px-6 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-xs text-gray-400 font-medium leading-relaxed border-t border-gray-50 pt-3">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Banner />
    </div>
  );
};

export default Home;
