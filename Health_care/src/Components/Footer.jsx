const Footer = () => {
  return (
    <footer id='about'>
     
      <div className="bg-blue-600 py-20 px-10 text-center text-white">
        
        <h2 className="text-4xl font-bold mb-4">Ready to Take Control of Your Health?</h2>
        <p className="text-blue-100 mb-10 max-w-2xl mx-auto">
          Join thousands of patients who trust HealthCare+ for their medical needs.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-slate-100 transition">
            Create Free Account
          </button>
          <button className="border border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white/10 transition">
            Contact Sales
          </button>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-slate-900 text-slate-400 py-16 px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg">HealthCare+</h3>
            <p>Your trusted partner for quality healthcare services.</p>
          </div>
          <div className="space-y-4">
            <h4 className="text-white font-bold uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              <li>About Us</li>
              <li>Services</li>
              <li>Doctors</li>
              <li>Contact</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-white font-bold uppercase tracking-wider">Services</h4>
            <ul className="space-y-2">
              <li>Book Appointment</li>
              <li>Telemedicine</li>
              <li>Lab Tests</li>
              <li>Health Records</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-white font-bold uppercase tracking-wider">Contact Us</h4>
            <p>123 Medical Center Dr.</p>
            <p>Phone: (555) 123-4567</p>
            <p>Email: info@healthcareplus.com</p>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-xs">
          © 2026 HealthCare+. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;