import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2, ChevronRight, ChevronLeft
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom'; // Added useLocation

// --- TOAST IMPORTS ---
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const STEPS = ['Patient Info', 'Appointment', 'Medical', 'Confirm'];

const BookingForm = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Hook to access navigation state
  
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    doctor: '',
    date: '',
    time: '',
    reason: '',
    isFirstTime: false
  });

  // Effect to catch the doctor passed from the Dashboard
  useEffect(() => {
    if (location.state && location.state.selectedDoctor) {
      setFormData(prev => ({
        ...prev,
        doctor: location.state.selectedDoctor
      }));
      
      // Optional: Jump straight to the appointment step (Step 1) 
      // if the doctor is already selected
      // setStep(1); 
    }
  }, [location]);

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const fadeSlide = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  const handleFinalSubmit = async () => {
    try {
      // Mocking a successful response for the demonstration
      // Replace with your actual fetch logic if the server is ready
      const response = await fetch('http://localhost:3000/api/appointments/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        // 1. Get existing appointments from storage
        const existing = JSON.parse(localStorage.getItem("appointments") || "[]");

        // 2. Add the new booking to the start of the list
        const updated = [formData, ...existing];

        // 3. Save back to localStorage
        localStorage.setItem("appointments", JSON.stringify(updated));

        toast.success("Appointment Secured!");
        setTimeout(() => navigate("/dashboard"), 1500);
      }
    } catch (error) {
      console.error("Error saving appointment:", error);
      toast.error("Failed to secure appointment.");
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-indigo-50 to-white flex items-center justify-center p-6">
      <ToastContainer />

      <div className="w-full max-w-2xl bg-white/70 backdrop-blur-xl border border-white/20 shadow-2xl rounded-[2.5rem] overflow-hidden">

        {/* Progress Stepper */}
        <div className="px-12 pt-10 pb-6">
          <div className="flex justify-between items-center relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0" />
            <motion.div
              className="absolute top-1/2 left-0 h-0.5 bg-blue-500 -translate-y-1/2 z-0"
              initial={{ width: '0%' }}
              animate={{ width: `${(step / 3) * 100}%` }}
            />
            {STEPS.map((label, i) => (
              <div key={label} className="relative z-10 flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${i <= step ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white text-gray-400 border border-gray-100'}`}>
                  {i < step ? <CheckCircle2 size={20} /> : <span>{i + 1}</span>}
                </div>
                <span className={`text-[10px] uppercase tracking-widest mt-2 font-semibold ${i <= step ? 'text-blue-600' : 'text-gray-400'}`}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="px-12 pb-12 min-h-[450px] flex flex-col">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="step0" {...fadeSlide} className="space-y-6">
                <header>
                  <h2 className="text-2xl font-semibold text-gray-800">Personal Details</h2>
                  <p className="text-gray-500">Please provide your contact information.</p>
                </header>
                <div className="space-y-4">
                  <input name="name" value={formData.name} onChange={handleInputChange} type="text" placeholder="Full Name" className="w-full px-5 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500/20 outline-none" />
                  <div className="grid grid-cols-2 gap-4">
                    <input name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="Email Address" className="w-full px-5 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500/20 outline-none" />
                    <input name="phone" value={formData.phone} onChange={handleInputChange} type="tel" placeholder="Phone Number" className="w-full px-5 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500/20 outline-none" />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="step1" {...fadeSlide} className="space-y-6">
                <header>
                  <h2 className="text-2xl font-semibold text-gray-800">Select Appointment</h2>
                  <p className="text-gray-500">Choose your doctor and time slot.</p>
                </header>

                {/* Doctor Selection */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: 'Dr. Sarah Jenkins', spec: 'Cardiologist' }, 
                    { name: 'Dr. Marcus Chen', spec: 'Neurologist' } // Corrected specialty to match image_0cd646.png
                  ].map((doc) => (
                    <button 
                      key={doc.name} 
                      type="button"
                      onClick={() => setFormData({ ...formData, doctor: doc.name })} 
                      className={`flex flex-col p-4 rounded-2xl border-2 transition-all text-left ${formData.doctor === doc.name ? 'border-blue-500 bg-blue-50/50' : 'border-transparent bg-white shadow-sm hover:bg-gray-50'}`}
                    >
                      <h4 className="font-semibold text-gray-800 text-sm">{doc.name}</h4>
                      <p className="text-[10px] text-gray-500">{doc.spec}</p>
                    </button>
                  ))}
                </div>

                {/* Date Picker */}
                <input name="date" type="date" value={formData.date} onChange={handleInputChange} className="w-full px-5 py-3 bg-white border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none text-sm" />

                {/* Time Slots */}
                <div className="grid grid-cols-3 gap-2">
                  {['09:00', '10:30', '14:00', '15:30', '16:00', '17:30'].map(t => (
                    <button 
                      key={t} 
                      type="button"
                      onClick={() => setFormData({ ...formData, time: t })} 
                      className={`py-3 rounded-xl text-sm font-medium transition-all ${formData.time === t ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" {...fadeSlide} className="space-y-6">
                <header>
                  <h2 className="text-2xl font-semibold text-gray-800">Medical History</h2>
                  <p className="text-gray-500">Help the doctor prepare for your visit.</p>
                </header>
                <textarea name="reason" value={formData.reason} onChange={handleInputChange} rows="4" className="w-full px-5 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500/20 outline-none resize-none" placeholder="Reason for visit..."></textarea>
                <label className="flex items-center gap-3 p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50 cursor-pointer">
                  <input name="isFirstTime" type="checkbox" checked={formData.isFirstTime} onChange={handleInputChange} className="w-5 h-5 rounded text-blue-600" />
                  <span className="text-sm text-gray-700 font-medium">First time visiting this clinic</span>
                </label>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" {...fadeSlide} className="flex flex-col items-center justify-center text-center space-y-4 py-10">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 size={40} />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Ready to Go!</h2>
                <div className="text-sm text-gray-500 bg-gray-50 p-4 rounded-2xl w-full">
                  <p>Appointment with <span className="font-bold text-gray-800">{formData.doctor || "No Doctor Selected"}</span></p>
                  <p>On <span className="font-bold text-gray-800">{formData.date || "TBD"}</span> at <span className="font-bold text-gray-800">{formData.time || "TBD"}</span></p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-auto pt-10 flex gap-4">
            {step > 0 && (
              <button onClick={prevStep} className="flex-1 px-6 py-4 rounded-2xl font-semibold text-gray-500 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                <ChevronLeft size={20} /> Back
              </button>
            )}
            {step < 3 ? (
              <button onClick={nextStep} className="flex-[2] px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-semibold shadow-xl transition-all flex items-center justify-center gap-2 group">
                {step === 2 ? 'Review Summary' : 'Continue'} <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <button onClick={handleFinalSubmit} className="w-full px-6 py-4 bg-gray-900 hover:bg-black text-white rounded-2xl font-semibold shadow-xl transition-all">
                Confirm & Secure Appointment
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;