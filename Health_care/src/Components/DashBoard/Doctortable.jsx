const DoctorTable = ({ onBook }) => {
  const doctors = [
    { name: "Dr. Sarah Jenkins", specialty: "Cardiologist", status: "Available" },
    { name: "Dr. Marcus Chen", specialty: "Neurologist", status: "In Consultation" }
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
      <table className="w-full text-left border-collapse">
        {/* ... table headers ... */}
        <tbody>
          {doctors.map((doc, i) => (
            <tr key={i} className="border-t border-slate-50">
              <td className="p-4 text-sm font-semibold text-slate-700">{doc.name}</td>
              <td className="p-4 text-sm text-slate-500">{doc.specialty}</td>
              <td className="p-4">
                <button 
                  onClick={() => onBook(doc.name, doc.specialty)}
                  className="text-blue-600 font-bold text-sm hover:underline"
                >
                  Book
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorTable;