import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { LogOut, ChevronDown, HeartPulse } from "lucide-react";
import PatientBooking from "../pages/PatientBooking";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const user = JSON.parse(localStorage.getItem("currentUser") || "{}");

  const handleLogout = () => {
    setOpen(false);
    localStorage.clear();
    navigate("/login");
  };

  // SMART NAVIGATION FUNCTION
  const handleNavClick = (sectionId) => {
    if (location.pathname !== "/") {
      // If we aren't home, go home then scroll
      navigate(`/#${sectionId}`);
    } else {
      // If already home, scroll smoothly
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 
      ${scrolled ? "bg-white/90 backdrop-blur-md shadow-md py-3" : "bg-transparent py-5"}`}>
      
      <div className="w-full px-6 md:px-10 flex items-center justify-between">
        
        {/* LOGO */}
      {/* LEFT SIDE: LOGO */}
     <Link 
       to="/" 
       onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
       className="flex items-center gap-2 group shrink-0"
>
  <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
    {/* Using the HeartPulse icon from your screenshot */}
    <HeartPulse className="text-white w-6 h-6" />
  </div>
  <span className="text-2xl font-black tracking-tight text-slate-900">
    Health<span className="text-indigo-600">Care</span>
  </span>
</Link>

        {/* NAVIGATION LINKS */}
        <ul className="hidden lg:flex items-center gap-10 text-sm font-bold text-slate-600">
          {["Services", "Features", "About"].map((item) => (
            <li key={item}>
              <button 
                onClick={() => handleNavClick(item.toLowerCase())}
                className="hover:text-indigo-600 transition-colors"
              >
                {item}
              </button>
            </li>
          ))}
          {/* Dashboard Link - Only shows if logged in */}
          {isLoggedIn && (
            <li>
              <Link to="/dashboard" className="text-indigo-600 hover:opacity-80 transition-opacity">
                Dashboard
              </Link>
            </li>
          )}
        </ul>

        {/* AUTH SECTION */}
        {/* Inside the AUTH SECTION of your Navbar.jsx */}
           {/* <div className="flex items-center gap-4 shrink-0">
            {isLoggedIn && (
           <button
              onClick={() => navigate("/book-appointment")}
             className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-all"
           >
            Book Now
          </button>
           )}
  
          </div> */}
        <div className="flex items-center gap-4 shrink-0">
          {!isLoggedIn ? (
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-100"
            >
              Sign In
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className={`flex items-center gap-3 p-1.5 pr-3 rounded-full transition-all border
                ${open ? "bg-slate-100 border-slate-200" : "bg-white/50 border-transparent hover:border-slate-200"}`}
              >
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:block text-sm font-bold text-slate-700">{user?.name?.split(' ')[0]}</span>
                <ChevronDown size={16} className={`text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
              </button>

              {open && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setOpen(false)}></div>
                  <div className="absolute right-0 mt-3 w-64 bg-white shadow-2xl rounded-2xl border border-slate-100 p-2 z-20">
                    <div className="px-4 py-3 border-b border-slate-50">
                      <p className="text-sm font-bold text-slate-800">{user?.name}</p>
                      <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl mt-1 transition-colors"
                    >
                      <LogOut size={18} /> Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;