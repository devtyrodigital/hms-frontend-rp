import React from 'react';
import '../styles/doctor-view-modal.css';

const DoctorViewModal = ({ isOpen, onClose, doctor }) => {
  if (!isOpen || !doctor) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-header">
          <h3>Doctor Details</h3>
          <span className="close-icon" onClick={onClose}>×</span>
        </div>

        <div className="modal-body">
          <div className="modal-row">
            <div>
              <strong>Doctor Name</strong>
              <p>{doctor.name}</p>
            </div>
            <div>
              <strong>Speciality</strong>
              <p>{doctor.speciality}</p>
            </div>
          </div>

          <div className="modal-row">
            <div>
              <strong>Experience (yrs)</strong>
              <p>{doctor.experience}</p>
            </div>
            <div>
              <strong>Total Appointments</strong>
              <p>{doctor.appointments}</p>
            </div>
          </div>

          <div className="modal-row">
            <div>
              <strong>Status</strong>
              <p>{doctor.status}</p>
            </div>
            <div>
              <strong>Date</strong>
              <p>{doctor.date}</p>
            </div>
          </div>

          <div className="modal-row">
            <div>
              <strong>Timings</strong>
              <p>{doctor.timings}</p>
            </div>
            <div>
              <strong>WhatsApp Contact</strong>
              <p>{doctor.contact || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorViewModal;
