import React, { useState, useEffect } from 'react';
import '../styles/appointment-modal.css';

const AppointmentModal = ({
  isOpen,
  onClose,
  appointment,
  onUpdate,
  onDelete,
  onSendNotification
}) => {
  const [editableAppointment, setEditableAppointment] = useState(appointment);

  // Reset state whenever a new appointment is opened
  useEffect(() => {
    setEditableAppointment(appointment);
  }, [appointment]);

  if (!isOpen || !appointment) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableAppointment(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    onUpdate(editableAppointment);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-header">
          <h3>Appointment Details</h3>
          <span className="close-icon" onClick={onClose}>×</span>
        </div>

        <div className="modal-body">
          <div className="modal-row">
            <div>
              <strong>Patient Name</strong>
              <input
                type="text"
                name="name"
                value={editableAppointment?.name || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <strong>Age</strong>
              <input
                type="number"
                name="age"
                value={editableAppointment?.age || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="modal-row">
            <div>
              <strong>Doctor Name</strong>
              <input
                type="text"
                name="doctor"
                value={editableAppointment?.doctor || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <strong>Condition</strong>
              <input
                type="text"
                name="condition"
                value={editableAppointment?.condition || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="modal-row">
            <div>
              <strong>Date</strong>
              <input
                type="date"
                name="date"
                value={editableAppointment?.date || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <strong>Time</strong>
              <input
                type="time"
                name="time"
                value={editableAppointment?.time || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="modal-row">
            <div>
              <strong>Status</strong>
              <select
                name="status"
                value={editableAppointment?.status || ""}
                onChange={handleChange}
              >
                <option value="Confirmed">Confirmed</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div>
              <strong>Payment Status</strong>
              <select
                name="payment_status"
                value={editableAppointment?.payment_status || ""}
                onChange={handleChange}
              >
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
              </select>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button
            className="green-btn"
            onClick={() => onSendNotification(editableAppointment)}
          >
            Send Notification
          </button>
          <button className="blue-btn" onClick={handleUpdate}>
            Update Status
          </button>
          <button className="gray-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;
