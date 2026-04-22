import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePatients } from '../context/PatientsContext';
import "../styles/doctor-add-modal.css"; // Reusing styles for consistency

const BookAppointment = () => {
    const navigate = useNavigate();
    const { setPatientsData } = usePatients();
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        doctor: '',
        condition: '',
        contact: '',
        dob: '',
        bloodGroup: '',
        weight: '',
        height: '',
        maritalStatus: '',
        state: '',
        city: '',
        address: '',
        medicalCondition: '',
        describeCondition: '',
        email: '',
        contactWhatsapp: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simple validation
        if (!formData.name || !formData.doctor) {
            alert("Please fill in at least Name and Doctor fields.");
            return;
        }

        // Generate a temporary ID
        const newPatient = {
            ...formData,
            id: Date.now(), // simple unique id
            patientId: `P-${Math.floor(Math.random() * 10000)}`
        };

        setPatientsData(prev => [...prev, newPatient]);
        navigate('/patients');
    };

    return (
        <div className="add-patient-page" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <div className="modal-box" style={{ position: 'static', transform: 'none', width: '100%' }}>
                <div className="modal-header">
                    <h3>Book Appointment</h3>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        {/* Personal Information */}
                        <h4>Personal Information</h4>
                        <div className="modal-row">
                            <div>
                                <strong>Patient Name</strong>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter patient name" required />
                            </div>
                            <div>
                                <strong>Age</strong>
                                <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="e.g. 30" />
                            </div>
                        </div>
                        <div className="modal-row">
                            <div>
                                <strong>Date of Birth</strong>
                                <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
                            </div>
                            <div>
                                <strong>Blood Group</strong>
                                <input type="text" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} placeholder="e.g. O+" />
                            </div>
                        </div>
                        <div className="modal-row">
                            <div>
                                <strong>Weight</strong>
                                <input type="text" name="weight" value={formData.weight} onChange={handleChange} placeholder="e.g. 70kg" />
                            </div>
                            <div>
                                <strong>Height</strong>
                                <input type="text" name="height" value={formData.height} onChange={handleChange} placeholder="e.g. 175cm" />
                            </div>
                        </div>
                        <div className="modal-row">
                            <div>
                                <strong>Marital Status</strong>
                                <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange}>
                                    <option value="">Select Status</option>
                                    <option value="Single">Single</option>
                                    <option value="Married">Married</option>
                                    <option value="Divorced">Divorced</option>
                                    <option value="Widowed">Widowed</option>
                                </select>
                            </div>
                        </div>

                        <hr />

                        {/* Contact Information */}
                        <h4>Contact Information</h4>
                        <div className="modal-row">
                            <div>
                                <strong>Contact Number</strong>
                                <input type="tel" name="contact" value={formData.contact} onChange={handleChange} placeholder="e.g. +91 9876543210" />
                            </div>
                            <div>
                                <strong>WhatsApp Number</strong>
                                <input type="tel" name="contactWhatsapp" value={formData.contactWhatsapp} onChange={handleChange} placeholder="e.g. +91 9876543210" />
                            </div>
                        </div>
                        <div className="modal-row">
                            <div>
                                <strong>Email</strong>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="e.g. john@example.com" />
                            </div>
                        </div>
                        <div className="modal-row">
                            <div>
                                <strong>Address</strong>
                                <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Full Address" />
                            </div>
                        </div>
                        <div className="modal-row">
                            <div>
                                <strong>City</strong>
                                <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" />
                            </div>
                            <div>
                                <strong>State</strong>
                                <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="State" />
                            </div>
                        </div>

                        <hr />

                        {/* Medical Information */}
                        <h4>Medical Information</h4>
                        <div className="modal-row">
                            <div>
                                <strong>Assigned Doctor</strong>
                                <input type="text" name="doctor" value={formData.doctor} onChange={handleChange} placeholder="Enter doctor name" required />
                            </div>
                            <div>
                                <strong>Condition (Short)</strong>
                                <input type="text" name="condition" value={formData.condition} onChange={handleChange} placeholder="e.g. Flu" />
                            </div>
                        </div>
                        <div className="modal-row">
                            <div>
                                <strong>Medical Condition (Detailed)</strong>
                                <input type="text" name="medicalCondition" value={formData.medicalCondition} onChange={handleChange} placeholder="Detailed diagnosis" />
                            </div>
                        </div>
                        <div className="modal-row">
                            <div>
                                <strong>Description</strong>
                                <textarea name="describeCondition" value={formData.describeCondition} onChange={handleChange} placeholder="Describe symptoms and condition..." rows="3" style={{ width: '100%' }}></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="gray-btn" onClick={() => navigate(-1)}>Cancel</button>
                        <button type="submit" className="green-btn">Book Appointment</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookAppointment;
