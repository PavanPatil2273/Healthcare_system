import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Added for navigation
import StatCard from "../components/dashboard/StatCard";
import DoctorTable from "../components/dashboard/DoctorTable";
import { Users, Calendar, Activity, Clock } from "lucide-react";

const Dashboard = () => {
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate(); // Hook to trigger navigation
  
  // Get User Info safely
  const user = JSON.parse(localStorage.getItem("currentUser") || "{}");

  useEffect(() => {
    // Pull the bookings you saved in the BookingForm
    const savedData = JSON.parse(localStorage.getItem("appointments") || "[]");
    setActivities(savedData);
  }, []);

  // Function to handle the "Book" button click in the DoctorTable
  const handleBookDoctor = (doctor) => {
    // Navigates to your BookingForm route
    // We pass the doctor's name in the state so the form can pre-select them
    navigate("/booking", { state: { selectedDoctor: doctor.name } });
  };

  return (
    <div id='dashboard' className="flex min-h-screen bg-slate-50 pt-24">
      <main className="flex-1 p-8">
        
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-2xl font-black text-slate-800">
            Welcome, {user.name || "utkarsh"}
          </h1>
          <p className="text-slate-500">
            Here is what's happening with your health today.
          </p>
        </header>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={<Calendar />}
            label="Upcoming"
            value={activities.length.toString()} 
            color="bg-indigo-600"
          />
          <StatCard
            icon={<Users />}
            label="Favorite Doctors"
            value="12"
            color="bg-purple-500"
          />
          <StatCard
            icon={<Activity />}
            label="Health Score"
            value="98%"
            color="bg-emerald-500"
          />
        </div>

        {/* TWO-COLUMN CONTENT AREA */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Available Doctors List */}
          <div className="lg:col-span-2">
            <h3 className="font-bold text-slate-800 mb-4">Top Rated Doctors</h3>
            {/* PASSING THE BOOKING FUNCTION TO THE TABLE */}
            <DoctorTable onBookClick={handleBookDoctor} />
          </div>

          {/* Right Column: Recent Activity Feed */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-fit">
            <h3 className="font-bold text-slate-800 mb-6">Recent Activity</h3>
            
            <div className="space-y-6">
              {activities.length === 0 ? (
                <p className="text-sm text-slate-400 italic">No recent activity found.</p>
              ) : (
                /* Reverse the array to show the most recent booking at the top */
                [...activities].reverse().slice(0, 5).map((item, index) => (
                  <div key={index} className="flex gap-4 relative">
                    {/* Timeline Line */}
                    {index !== Math.min(activities.length, 5) - 1 && (
                      <div className="absolute left-[7px] top-5 w-0.5 h-10 bg-slate-100"></div>
                    )}
                    
                    {/* Status Indicator */}
                    <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center z-10 mt-1">
                      <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                    </div>

                    <div className="flex flex-col">
                      <p className="text-sm font-bold text-slate-800">
                        Recently booked {item.doctor}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Appointment confirmed for {item.reason || "Checkup"}
                      </p>
                      <div className="flex items-center gap-1.5 mt-2 text-[10px] text-slate-400 font-bold uppercase">
                        <Clock size={12} />
                        <span>{item.date} • {item.time}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;