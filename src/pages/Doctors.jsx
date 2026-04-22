import React, { useState } from "react";
import "../styles/doctors.css";
import DoctorAddModal from "../components/DoctorAddModal";
import DoctorEditModal from "../components/DoctorEditModal";
import DoctorViewModal from "../components/DoctorViewModal";
import { useDoctors } from "../context/DoctorsContext"; // ✅ using context

const Doctors = () => {
  const { doctorsData, setDoctorsData } = useDoctors(); // ✅ context data

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewDoctor, setViewDoctor] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [tooltipData, setTooltipData] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [hoveredRowId, setHoveredRowId] = useState(null);

  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const handleDoctorHover = (e, doc) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipData(doc);
    setTooltipPos({
      x: rect.right + 10,
      y: rect.top,
    });
    setHoveredRowId(doc.id);
  };

  const handleDoctorLeave = () => {
    setTooltipData(null);
    setHoveredRowId(null);
  };

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ✅ Add Doctor
  const handleAddDoctor = (newDoctor) => {
    const today = new Date().toISOString().split("T")[0];
    const updatedDoctor = {
      id: doctorsData.length + 1,
      ...newDoctor,
      date: today,
      appointments: newDoctor.appointments || "0",
    };
    setDoctorsData((prev) => [...prev, updatedDoctor]);
  };

  // ✅ Edit Doctor
  const handleEditClick = (doctor) => {
    setSelectedDoctor(doctor);
    setIsEditModalOpen(true);
  };

  // ✅ Update Doctor
  const handleUpdateDoctor = (updatedDoctor) => {
    setDoctorsData((prev) =>
      prev.map((doc) => (doc.id === updatedDoctor.id ? updatedDoctor : doc))
    );
    setSelectedDoctor(null);
    setIsEditModalOpen(false);
  };

  // ✅ View Doctor
  const handleViewClick = (doctor) => {
    setViewDoctor(doctor);
    setIsViewModalOpen(true);
  };

  return (
    <div className="doctor-container">
      {/* Header */}
      <div className="doctor-header">
        <h2>Doctor Management</h2>
        <button className="add-btn" onClick={() => setIsAddModalOpen(true)}>
          Add New Doctor
        </button>
      </div>

      {/* Filters */}
      <div className="doctor-filters">
        <input
          type="text"
          placeholder="Search Doctor, Speciality"
          className="search-input"
        />
        <input type="date" className="date-input" />
      </div>

      {/* Doctor Table */}
      <div className="doctor-table-wrapper">
        <table className="doctor-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Doctor Name</th>
              <th>Speciality</th>
              <th>Experience</th>
              <th>Total Appointments</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctorsData && doctorsData.length > 0 ? (
              doctorsData.map((doc) => (
                <tr key={doc.id} className={hoveredRowId === doc.id ? 'row-highlighted' : ''}>
                  <td>{doc.date || "—"}</td>
                  <td
                    onMouseEnter={(e) => handleDoctorHover(e, doc)}
                    onMouseLeave={handleDoctorLeave}
                    style={{ cursor: 'pointer', position: 'relative' }}
                    className="doctor-name-cell"
                  >
                    <span className="doctor-name-hover">{doc.name}</span>
                  </td>
                  <td>{doc.speciality}</td>
                  <td>{doc.experience}</td>
                  <td>{doc.appointments || "0"}</td>
                  <td>
                    <span
                      className={`status ${doc.status?.toLowerCase() || ""}`}
                    >
                      {doc.status}
                    </span>
                  </td>
                  <td className="dropdown-container" style={{ position: 'relative' }}>
                    <button className="action-btn" onClick={() => toggleDropdown(doc.id)}>
                      &#x22EE;
                    </button>
                    {openDropdownId === doc.id && (
                      <div className="dropdown-menu">
                        <button onClick={() => { handleEditClick(doc); setOpenDropdownId(null); }}>Edit</button>
                        <button onClick={() => { handleViewClick(doc); setOpenDropdownId(null); }}>View</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "1rem" }}>
                  No doctors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Doctor Quick View Tooltip */}
      {tooltipData && (
        <div
          className="doctor-tooltip"
          style={{
            position: 'fixed',
            left: Math.max(10, Math.min(tooltipPos.x, window.innerWidth - 370)),
            top: Math.max(50, Math.min(tooltipPos.y, window.innerHeight - 200)),
            minWidth: '280px',
            maxWidth: '350px',
          }}
        >
          <div style={{ fontSize: '0.9rem', marginBottom: '8px' }}>
            <strong>{tooltipData.name}</strong>
          </div>
          <div style={{ fontSize: '0.85rem', color: '#555', lineHeight: '1.6' }}>
            <div><strong>Speciality:</strong> {tooltipData.speciality}</div>
            <div><strong>Experience:</strong> {tooltipData.experience}</div>
            <div><strong>Total Appointments:</strong> {tooltipData.appointments || '0'}</div>
            <div><strong>Status:</strong> {tooltipData.status}</div>
          </div>
        </div>
      )}

      {/* Modals */}
      <DoctorAddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddDoctor}
      />

      <DoctorEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdate={handleUpdateDoctor}
        doctor={selectedDoctor}
      />

      <DoctorViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        doctor={viewDoctor}
      />
    </div>
  );
};

export default Doctors;
