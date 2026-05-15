import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
// 1. Import Framer Motion
import { motion, AnimatePresence } from "framer-motion";
// 2. Import Toast (keeping it global)
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Dashboard from "./pages/DashBoard";
import PatientBooking from "./pages/PatientBooking";
import DoctorTable from "./components/dashboard/DoctorTable";

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

// 3. Simple Page Transition Wrapper
const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.4, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-indigo-100 selection:text-indigo-700">
      <ScrollToTop />
      
      {/* Global Toast Notification Container */}
      <ToastContainer position="top-center" theme="colored" />
      
      <Navbar />

      <main className="pt-20">
        {/* 4. AnimatePresence enables components to animate out when they're removed from the DOM */}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* PUBLIC LANDING PAGE */}
            <Route
              path="/"
              element={
                <PageWrapper>
                  <Hero />
                  <div id="services"><Services /></div>
                  <div id="features"><Features /></div>
                  <Footer />
                </PageWrapper>
              }
            />

            {/* AUTH PAGE */}
            <Route 
              path="/login" 
              element={
                <PageWrapper>
                  <Login />
                </PageWrapper>
              } 
            />

            {/* PATIENT BOOKING ROUTE */}
            <Route
              path="/book-appointment"
              element={
                <ProtectedRoute>
                  <PageWrapper>
                    <PatientBooking />
                  </PageWrapper>
                </ProtectedRoute>
              }
            />

            {/* PROTECTED DASHBOARD */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <PageWrapper>
                    <Dashboard />
                  </PageWrapper>
                </ProtectedRoute>
              }
            />

            {/* 404 REDIRECT */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;