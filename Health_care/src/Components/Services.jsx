import React from 'react';
import { CheckCircle2 } from 'lucide-react';



const Services = () => {
  const serviceList = [
    { title: "General Consultation", desc: "Expert medical advice for common health concerns" },
    { title: "Specialist Appointments", desc: "Connect with specialists in cardiology, neurology, and more" },
    { title: "Lab Tests & Diagnostics", desc: "Book lab tests and get results digitally" },
    { title: "Telemedicine", desc: "Virtual consultations from the comfort of your home" },
    
  ];



  return (
    
   <section id="services"  
     className="py-20 px-10 flex flex-col md:flex-row items-center gap-16 max-w-7xl mx-auto scroll-mt-24 bg-slate-50"
   >
    
      <div className="md:w-1/2">
        <img 
          src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=800&q=80" 
          alt="Healthcare Professional" 
          className="rounded-3xl shadow-2xl"
        />
      </div>
      <div className="md:w-1/2 space-y-6">
        <h2 className="text-4xl font-bold text-slate-900 leading-tight">
          Comprehensive Healthcare Services
        </h2>
        <div className="space-y-5">
          {serviceList.map((item, i) => (
            <div key={i} className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-800">{item.title}</h4>
                <p className="text-slate-500 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-4 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
          Get Started Today
        </button>
      </div>
    
    </section>
  );
};

export default Services;