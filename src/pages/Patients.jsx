import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/patients.css";
import { usePatients } from '../context/PatientsContext';
import PatientModal from "../components/PatientModal";

const Patients = () => {
  const { patientsData, setPatientsData } = usePatients();
  const navigate = useNavigate();
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [tooltipData, setTooltipData] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [hoveredRowId, setHoveredRowId] = useState(null);
  // const [showAddModal, setShowAddModal] = useState(false); // Modal no longer used

  // ✅ Toggle dropdown
  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const handlePatientHover = (e, patient) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipData(patient);
    setTooltipPos({
      x: rect.right + 10,
      y: rect.top,
    });
    setHoveredRowId(patient.patientId || patient.id);
  };

  const handlePatientTooltipLeave = () => {
    setTooltipData(null);
    setHoveredRowId(null);
  };

  // ✅ Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // ✅ Navigate to Add Patient page
  const handleAddPatient = () => {
    navigate('/add-patient');
  };

  const handleViewDetails = (patient) => {
    setSelectedPatient(patient);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPatient(null);
  };

  const handleEditPatient = (patient) => {
    // Navigate to Add Patient page with state so the form can prefill in future
    navigate('/add-patient', { state: { patient, edit: true } });
  };

  return (
    <div className="patient-container">
      <div className="patient-header">
        <h2>Patient Details</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button className="add-btn" onClick={handleAddPatient}>
            Add Patient
          </button>
          <button className="add-btn create-appointment-btn" onClick={() => navigate('/book-appointment')}>
            Create Appointment
          </button>
        </div>
      </div>

      <div className="patient-filters">
        <input type="text" placeholder="Search Patient" className="search-input" />
      </div>

      <div className="patient-table-wrapper">
        <table className="patient-table">
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Patient Name</th>
              <th>Age</th>
              <th>Doctor</th>
              <th>Condition</th>
              <th>Contact</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {patientsData.map((p, index) => (
              <tr key={index} className={hoveredRowId === (p.patientId || p.id) ? 'row-highlighted' : ''}>
                <td>{p.patientId || p.id}</td>
                <td
                  onMouseEnter={(e) => handlePatientHover(e, p)}
                  onMouseLeave={handlePatientTooltipLeave}
                  style={{ cursor: 'pointer', position: 'relative' }}
                  className="patient-name-cell"
                >
                  <span className="patient-name-hover">{p.name}</span>
                </td>
                <td>{p.age}</td>
                <td>{p.doctor}</td>
                <td>{p.condition}</td>
                <td>{p.contact}</td>
                <td className="dropdown-container" style={{ position: 'relative' }}>
                  <button className="patient-action-btn" onClick={() => toggleDropdown(p.patientId || p.id)}>
                    &#x22EE;
                  </button>
                  {openDropdownId === (p.patientId || p.id) && (
                    <div className="dropdown-menu">
                      <button onClick={() => { handleViewDetails(p); setOpenDropdownId(null); }}>View Details</button>
                      <button onClick={() => { setOpenDropdownId(null); }}>Check Reports</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Patient Quick View Tooltip */}
      {tooltipData && (
        <div
          className="patient-tooltip"
          style={{
            position: 'fixed',
            left: Math.max(10, Math.min(tooltipPos.x, window.innerWidth - 370)),
            top: Math.max(50, Math.min(tooltipPos.y, window.innerHeight - 250)),
            minWidth: '280px',
            maxWidth: '350px',
          }}
        >
          <div style={{ fontSize: '0.9rem', marginBottom: '8px' }}>
            <strong>{tooltipData.name}</strong>
          </div>
          <div style={{ fontSize: '0.85rem', color: '#555', lineHeight: '1.6' }}>
            <div><strong>Age:</strong> {tooltipData.age}</div>
            <div><strong>Doctor:</strong> {tooltipData.doctor}</div>
            <div><strong>Condition:</strong> {tooltipData.condition}</div>
            <div><strong>Contact:</strong> {tooltipData.contact}</div>
          </div>
        </div>
      )}

      {/* Patient View Modal */}
      {/* Patient View Modal */}
      {showModal && (
        <PatientModal
          patient={selectedPatient}
          onClose={handleCloseModal}
          onEdit={handleEditPatient}
        />
      )}
    </div>
  );
};

export default Patients;
