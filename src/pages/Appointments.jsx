import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import "../styles/appointments.css";
import AppointmentModal from "../components/AppointmentModal";
import { useAppointments } from "../context/AppointmentsContext"; // ✅ import context

const Appointments = () => {
  const navigate = useNavigate();
  const { appointments, setAppointments } = useAppointments(); // ✅ use context
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (appointment) => {
    setSelectedAppointment(appointment);
    setModalOpen(true);
  };



  // 🟢 Update
  const handleUpdateAppointment = (updated) => {
    setAppointments((prev) =>
      prev.map((appt) => (appt.id === updated.id ? updated : appt))
    );
    console.log("Updated:", updated);
  };

  // 🔴 Delete
  const handleDeleteAppointment = (id) => {
    setAppointments((prev) => prev.filter((appt) => appt.id !== id));
    console.log("Deleted appointment with id:", id);
    setModalOpen(false);
  };

  // 📩 Notify
  const handleNotifyAppointment = (id) => {
    const appt = appointments.find((a) => a.id === id);
    if (appt) {
      alert(`Notification sent to ${appt.name} for ${appt.time}`);
    }
  };

  // 📝 Notes Modal State
  const [notesModalOpen, setNotesModalOpen] = useState(false);
  const [selectedApptForNotes, setSelectedApptForNotes] = useState(null);
  const [noteText, setNoteText] = useState("");
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [tooltipData, setTooltipData] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [hoveredRowId, setHoveredRowId] = useState(null);

  const handleOpenNotes = (appt) => {
    setSelectedApptForNotes(appt);
    setNoteText(appt.remarks || "");
    setIsEditingNote(false); // Default to view mode
    setNotesModalOpen(true);
  };

  const handleEditNote = () => {
    setIsEditingNote(true);
  };

  const handleSaveNote = () => {
    if (selectedApptForNotes) {
      const updatedAppt = { ...selectedApptForNotes, remarks: noteText };
      setAppointments((prev) =>
        prev.map((a) => (a.id === updatedAppt.id ? updatedAppt : a))
      );
      setSelectedApptForNotes(updatedAppt);
      setIsEditingNote(false);
      setNotesModalOpen(false);
      console.log("Saved note:", updatedAppt);
    }
  };

  const handleDeleteNote = (id) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, remarks: "" } : a))
    );
    if (selectedApptForNotes && selectedApptForNotes.id === id) {
      setSelectedApptForNotes({ ...selectedApptForNotes, remarks: "" });
    }
    setNotesModalOpen(false);
    setIsEditingNote(false);
    console.log("Deleted note for appointment id:", id);
  };

  const handleCloseNotes = () => {
    setNotesModalOpen(false);
    setIsEditingNote(false);
    setSelectedApptForNotes(null);
    setNoteText("");
  };

  const handleSendNotificationFromModal = (appt) => {
    // AppointmentModal passes the full appointment object
    if (appt && appt.id) {
      handleNotifyAppointment(appt.id);
    }
  };

  const toggleDropdown = (id) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };

  const handlePatientHover = (e, appt) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipData(appt);
    setTooltipPos({
      x: rect.right + 10,
      y: rect.top,
    });
    setHoveredRowId(appt.id);
  };

  const handlePatientLeave = () => {
    setTooltipData(null);
    setHoveredRowId(null);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest || !document.querySelector) return;
      const open = document.querySelector('.dropdown-menu');
      if (open && !e.target.closest('.dropdown-container')) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="appointments-container">
      <div className="appointments-header">
        <h2>Appointments</h2>
        <div>
          <button
            className="create-btn"
            onClick={() => navigate('/book-appointment')}
          >
            Create Appointment
          </button>
        </div>
      </div>

      <div className="appointments-filters">
        <input className="search-input" placeholder="Search appointments" />
        <input type="date" className="date-input" />
      </div>

      <div className="appointments-table-wrapper">
        <table className="appointments-table">
          <thead>
            <tr className="thead-tr">
              <th>Time</th>
              <th>Patient</th>
              <th>Age</th>
              <th>Doctor</th>
              <th>Condition</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Remarks</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a.id} className={hoveredRowId === a.id ? 'row-highlighted' : ''}>
                <td>{a.time}</td>
                <td
                  onMouseEnter={(e) => handlePatientHover(e, a)}
                  onMouseLeave={handlePatientLeave}
                  style={{ cursor: 'pointer', position: 'relative' }}
                  className="patient-name-cell"
                >
                  <span className="patient-name-hover">{a.name}</span>
                </td>
                <td>{a.age}</td>
                <td>{a.doctor}</td>
                <td>{a.condition}</td>
                <td>
                  <span className={`status ${a.status?.toLowerCase().replace(/\s+/g, '-')}`}>
                    {a.status}
                  </span>
                </td>
                <td>
                  <span className={`payment_status ${a.payment_status?.toLowerCase()}`}>
                    {a.payment_status}
                  </span>
                </td>
                <td>
                  <div style={{display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center'}}>
                    {a.remarks ? (
                      <span className="remarks-snippet">
                        {a.remarks.length > 60 ? a.remarks.slice(0, 60) + '…' : a.remarks}
                      </span>
                    ) : (
                      <span className="no-notes">No remarks</span>
                    )}
                    <button
                      className="view-notes-link"
                      onClick={() => handleOpenNotes(a)}
                      style={{ marginLeft: 8 }}
                    >
                      {a.remarks ? 'View' : 'Add'}
                    </button>
                  </div>
                </td>
                <td className="dropdown-container">
                  <button className="patient-action-btn" onClick={() => toggleDropdown(a.id)}>
                    &#x22EE;
                  </button>
                  {openDropdownId === a.id && (
                    <div className="dropdown-menu">
                      <button onClick={() => { openModal(a); setOpenDropdownId(null); }}>View Details</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Appointment Modal */}
      {modalOpen && selectedAppointment && (
        <AppointmentModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          appointment={selectedAppointment}
          onUpdate={handleUpdateAppointment}
          onDelete={() => handleDeleteAppointment(selectedAppointment.id)}
          onSendNotification={handleSendNotificationFromModal}
        />
      )}

      {/* Notes Modal */}
      {notesModalOpen && selectedApptForNotes && (
        <div className="modal-overlay">
          <div className="notes-modal">
            <h3>Receptionist Remarks</h3>

            {isEditingNote ? (
              <textarea
                className="notes-textarea"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
              />
            ) : (
              <div className="notes-display">
                {selectedApptForNotes.remarks ? (
                  selectedApptForNotes.remarks
                ) : (
                  <div className="no-notes">No remarks added.</div>
                )}
              </div>
            )}

            <div className="modal-actions">
              {!isEditingNote && (
                <button className="edit-btn" onClick={handleEditNote}>
                  Edit
                </button>
              )}

              {isEditingNote && (
                <button className="save-btn" onClick={handleSaveNote}>
                  Save
                </button>
              )}

              <button
                className="cancel-btn"
                onClick={() => handleCloseNotes()}
              >
                Close
              </button>

              {!isEditingNote && selectedApptForNotes.remarks && (
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteNote(selectedApptForNotes.id)}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      )}

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
            <div><strong>Status:</strong> {tooltipData.status}</div>
            <div><strong>Payment:</strong> {tooltipData.payment_status}</div>
            {tooltipData.remarks && (
              <div><strong>Remarks:</strong> {tooltipData.remarks}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
