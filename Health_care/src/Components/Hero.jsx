import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-10 h-screen bg-slate-50 overflow-hidden">
      {/* Left Content */}
      <div className="md:w-1/2 space-y-6">
        <h1 className="text-6xl font-extrabold text-slate-900 ml-15 leading-tight">
          Your Health, Our <br />{" "}
          <span className="text-slate-800">Priority</span>
        </h1>
        <p className="text-lg text-slate-500 max-w-md leading-relaxed ml-15">
          Book appointments with top doctors instantly. Experience seamless
          healthcare management with our modern platform.
        </p>

        <div className="flex gap-4 pt-4">
          <button
            onClick={() => navigate("/book-appointment")}
            className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-blue-200 ml-15 hover:bg-blue-700 transition"
          >
            Book Appointment
          </button>
          {/* Inside Hero.jsx */}
          {/* <button 
            onClick={() => navigate("/book-appointment")}
           className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all"
         >
           Start Booking
            </button> */}
        </div>

        {/* Stats Section */}
        <div className="flex justify-start gap-10 ml-14">
          <div>
            <h3 className="text-3xl font-bold text-blue-600 ">500+</h3>
            <p className="text-slate-500 text-sm">Expert Doctors</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-blue-600">50k+</h3>
            <p className="text-slate-500 text-sm">Happy Patients</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-blue-600">24/7</h3>
            <p className="text-slate-500 text-sm">Support</p>
          </div>
        </div>
      </div>

      {/* Right Image */}
      <div className="md:w-1/2 mt-12 mr-20 md:mt-5 relative">
        <div className="rounded-3xl overflow-hidden shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80"
            alt="Doctor Consultation"
            className="w-full h-[500px] mr-10 object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
