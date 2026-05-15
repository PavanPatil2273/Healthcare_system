import React from 'react';
import { Calendar, Users, Clock, ShieldCheck, Stethoscope, Heart } from 'lucide-react';

const features = [
  {
    title: "Easy Scheduling",
    desc: "Book appointments in seconds with our intuitive calendar system. Choose your preferred time slot effortlessly.",
    icon: <Calendar className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Expert Doctors",
    desc: "Access a network of verified, experienced doctors across multiple specialties. Quality care guaranteed.",
    icon: <Users className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "24/7 Availability",
    desc: "Round-the-clock access to healthcare services. Book appointments and get support anytime, anywhere.",
    icon: <Clock className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Secure & Private",
    desc: "Your health data is protected with enterprise-grade security. HIPAA compliant and fully encrypted.",
    icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Multiple Specialties",
    desc: "From general physicians to specialists, find the right doctor for your specific healthcare needs.",
    icon: <Stethoscope className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Patient-Centered Care",
    desc: "Personalized treatment plans and follow-ups. Your health journey, tailored to you.",
    icon: <Heart className="w-6 h-6 text-blue-600" />,
  },
];

const Features = () => {
  return (
    <section id='features' className="py-20 px-10 bg-white">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">Why Choose HealthCare+?</h2>
        <p className="text-slate-500 text-lg">Experience the future of healthcare management</p>
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="p-10 border border-slate-100 rounded-2xl flex flex-col items-center text-center hover:shadow-xl hover:shadow-blue-50 transition-all duration-300 group"
          >
            {/* Icon Circle */}
            <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              {feature.icon}
            </div>
            
            <h3 className="text-xl font-bold text-slate-800 mb-4">{feature.title}</h3>
            <p className="text-slate-500 leading-relaxed text-sm">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;