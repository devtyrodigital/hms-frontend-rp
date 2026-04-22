import React, { useState, useEffect } from 'react';
import '../styles/doctor-edit-modal.css';

const DoctorEditModal = ({ isOpen, onClose, onUpdate, doctor }) => {
  const [formData, setFormData] = useState({
    date: '',
    name: '',
    speciality: '',
    experience: '',
    appointments: '',
    status: 'Available',
    timings: '',     // ✅ added timings
    whatsapp: ''     // ✅ added WhatsApp number
  });

  const specialities = ['Orthopedic Surgeon', 'Dermatologist', 'Cardiologist', 'Neurologist'];

  useEffect(() => {
    if (doctor) {
      setFormData(doctor);
    }
  }, [doctor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onUpdate(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-header">
          <h3>Edit Doctor</h3>
          <span className="close-icon" onClick={onClose}>×</span>
        </div>

        <div className="modal-body">
          <div className="modal-row">
            <div>
              <strong>Doctor Name</strong>
              <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div>
              <strong>Speciality</strong>
              <select name="speciality" value={formData.speciality} onChange={handleChange}>
                <option value="">Select speciality</option>
                {specialities.map((s, i) => (
                  <option key={i} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="modal-row">
            <div>
              <strong>Experience (yrs)</strong>
              <input type="number" name="experience" value={formData.experience} onChange={handleChange} />
            </div>
            <div>
              <strong>Total Appointments</strong>
              <input type="number" name="appointments" value={formData.appointments} onChange={handleChange} />
            </div>
          </div>

          <div className="modal-row">
            <div>
              <strong>Status</strong>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </div>
            <div>
              <strong>Date</strong>
              <input type="date" name="date" value={formData.date} onChange={handleChange} />
            </div>
          </div>

          <div className="modal-row">
            <div>
              <strong>Timings</strong>
              <input
                type="text"
                name="timings"
                value={formData.timings}
                onChange={handleChange}
                placeholder="e.g., 10:00 AM - 2:00 PM"
              />
            </div>
            <div>
              <strong>WhatsApp Number</strong>
              <input
                type="tel"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                placeholder="e.g., +91 9876543210"
              />
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="gray-btn" onClick={onClose}>Cancel</button>
          <button className="green-btn" onClick={handleSubmit}>Update Doctor</button>
        </div>
      </div>
    </div>
  );
};

export default DoctorEditModal;
