import React, { useState } from "react";
import { CheckCircle, ChevronRight, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BookingFlow = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: "",
    doctor: "",
    date: "",
    time: "",
    reason: ""
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const steps = ["Specialty", "Schedule", "Details", "Confirm"];

  const handleFinalConfirm = async () => {
    try {
      const existingAppointments = JSON.parse(
        localStorage.getItem("appointments") || "[]"
      );

      const newBooking = {
        id: Date.now(),
        ...formData,
        status: "Confirmed",
        userName: "Guest User" // FIXED (replace with real auth user if available)
      };

      // Save locally
      localStorage.setItem(
        "appointments",
        JSON.stringify([...existingAppointments, newBooking])
      );

      // Send to backend
      const response = await fetch("http://localhost:5000/api/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newBooking)
      });

      if (response.ok) {
        navigate("/dashboard");
      } else {
        console.error("Server error");
      }
    } catch (error) {
      console.error("Booking failed:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl shadow-slate-200/60 overflow-hidden border border-slate-100">
      
      {/* PROGRESS BAR */}
      <div className="bg-slate-50 px-8 py-6 border-b border-slate-100">
        <div className="flex justify-between items-center relative">
          {steps.map((label, index) => (
            <div key={label} className="flex flex-col items-center z-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step > index + 1
                    ? "bg-emerald-500 text-white"
                    : step === index + 1
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-200 text-slate-500"
                }`}
              >
                {step > index + 1 ? <CheckCircle size={20} /> : index + 1}
              </div>
              <span
                className={`text-xs mt-2 font-bold ${
                  step === index + 1
                    ? "text-indigo-600"
                    : "text-slate-400"
                }`}
              >
                {label}
              </span>
            </div>
          ))}
          <div className="absolute top-5 left-0 w-full h-0.5 bg-slate-200" />
        </div>
      </div>

      {/* FORM */}
      <div className="p-8 min-h-[400px]">
        {step === 1 && (
          <div>
            <h2 className="text-xl font-black mb-6">What care do you need?</h2>
            <div className="grid grid-cols-2 gap-4">
              {["Cardiology", "Neurology", "Pediatrics", "General Checkup"].map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setFormData({ ...formData, service: s });
                    nextStep();
                  }}
                  className="p-4 rounded-2xl border"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-xl font-black mb-6">Select Date & Time</h2>

            <input
              type="date"
              className="w-full p-4 border rounded-xl"
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />

            <div className="grid grid-cols-3 gap-3 mt-4">
              {["09:00 AM", "11:00 AM", "02:00 PM", "04:30 PM"].map((t) => (
                <button
                  key={t}
                  onClick={() =>
                    setFormData({ ...formData, time: t })
                  }
                  className="py-2 border rounded-xl"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-xl font-black mb-6">Medical History</h2>
            <textarea
              className="w-full h-32 p-4 border rounded-xl"
              onChange={(e) =>
                setFormData({ ...formData, reason: e.target.value })
              }
            />
          </div>
        )}

        {step === 4 && (
          <div className="text-center py-10">
            <CheckCircle size={40} className="mx-auto text-green-500" />
            <h2 className="text-2xl font-black">Ready to Book!</h2>
            <p>
              Confirm your {formData.service} appointment on{" "}
              {formData.date} at {formData.time}.
            </p>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className="p-6 flex justify-between">
        <button onClick={prevStep} disabled={step === 1}>
          <ChevronLeft /> Back
        </button>

        {step < 4 ? (
          <button onClick={nextStep}>
            Continue <ChevronRight />
          </button>
        ) : (
          <button onClick={handleFinalConfirm}>
            Confirm Appointment
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingFlow;