import React, { useState, useEffect } from 'react';
import { usePatients } from '../context/PatientsContext';
import '../styles/doctor-view-modal.css'; // Reusing existing modal styles for consistency

const PatientModal = ({ patient, onClose }) => {
    const { patientsData, setPatientsData } = usePatients();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (patient) {
            setFormData({ ...patient });
            setIsEditing(false);
        }
    }, [patient]);

    if (!patient) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        setPatientsData((prev) =>
            prev.map((p) => (p.id === patient.id ? { ...p, ...formData } : p))
        );
        setIsEditing(false);
    };

    const handleCancel = () => {
        setFormData({ ...patient });
        setIsEditing(false);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <div className="modal-header">
                    <h3>Patient Details</h3>
                    <span className="close-icon" onClick={onClose}>×</span>
                </div>

                <div className="modal-body">
                    {/* Personal Information */}
                    <h4>Personal Information</h4>
                    <div className="modal-row">
                        <div>
                            <strong>Patient Name</strong>
                            {isEditing ? (
                                <input name="name" value={formData.name || ''} onChange={handleChange} />
                            ) : (
                                <p>{patient.name}</p>
                            )}
                        </div>
                        <div>
                            <strong>Patient ID</strong>
                            <p>{patient.patientId || patient.id}</p>
                        </div>
                    </div>
                    <div className="modal-row">
                        <div>
                            <strong>Age</strong>
                            {isEditing ? (
                                <input name="age" value={formData.age || ''} onChange={handleChange} />
                            ) : (
                                <p>{patient.age}</p>
                            )}
                        </div>
                        <div>
                            <strong>Date of Birth</strong>
                            {isEditing ? (
                                <input type="date" name="dob" value={formData.dob || ''} onChange={handleChange} />
                            ) : (
                                <p>{patient.dob || 'N/A'}</p>
                            )}
                        </div>
                    </div>
                    <div className="modal-row">
                        <div>
                            <strong>Gender</strong>
                            {isEditing ? (
                                <input name="gender" value={formData.gender || ''} onChange={handleChange} />
                            ) : (
                                <p>{patient.gender || 'N/A'}</p>
                            )}
                        </div>
                        <div>
                            <strong>Blood Group</strong>
                            {isEditing ? (
                                <input name="bloodGroup" value={formData.bloodGroup || ''} onChange={handleChange} />
                            ) : (
                                <p>{patient.bloodGroup || 'N/A'}</p>
                            )}
                        </div>
                    </div>
                    <div className="modal-row">
                        <div>
                            <strong>Weight</strong>
                            {isEditing ? (
                                <input name="weight" value={formData.weight || ''} onChange={handleChange} />
                            ) : (
                                <p>{patient.weight || 'N/A'}</p>
                            )}
                        </div>
                        <div>
                            <strong>Height</strong>
                            {isEditing ? (
                                <input name="height" value={formData.height || ''} onChange={handleChange} />
                            ) : (
                                <p>{patient.height || 'N/A'}</p>
                            )}
                        </div>
                    </div>
                    <div className="modal-row">
                        <div>
                            <strong>Marital Status</strong>
                            {isEditing ? (
                                <input name="maritalStatus" value={formData.maritalStatus || ''} onChange={handleChange} />
                            ) : (
                                <p>{patient.maritalStatus || 'N/A'}</p>
                            )}
                        </div>
                    </div>

                    <hr />

                    {/* Contact Information */}
                    <h4>Contact Information</h4>
                    <div className="modal-row">
                        <div>
                            <strong>Phone Number</strong>
                            {isEditing ? (
                                <input name="contact" value={formData.contact || ''} onChange={handleChange} />
                            ) : (
                                <p>{patient.contact}</p>
                            )}
                        </div>
                        <div>
                            <strong>WhatsApp</strong>
                            {isEditing ? (
                                <input name="contactWhatsapp" value={formData.contactWhatsapp || ''} onChange={handleChange} />
                            ) : (
                                <p>{patient.contactWhatsapp || 'N/A'}</p>
                            )}
                        </div>
                    </div>
                    <div className="modal-row">
                        <div>
                            <strong>Email</strong>
                            {isEditing ? (
                                <input name="email" value={formData.email || ''} onChange={handleChange} />
                            ) : (
                                <p>{patient.email || 'N/A'}</p>
                            )}
                        </div>
                    </div>
                    <div className="modal-row">
                        <div>
                            <strong>Address</strong>
                            {isEditing ? (
                                <input name="address" value={formData.address || ''} onChange={handleChange} />
                            ) : (
                                <p>{patient.address || 'N/A'}</p>
                            )}
                        </div>
                    </div>
                    <div className="modal-row">
                        <div>
                            <strong>City</strong>
                            {isEditing ? (
                                <input name="city" value={formData.city || ''} onChange={handleChange} />
                            ) : (
                                <p>{patient.city || 'N/A'}</p>
                            )}
                        </div>
                        <div>
                            <strong>State</strong>
                            {isEditing ? (
                                <input name="state" value={formData.state || ''} onChange={handleChange} />
                            ) : (
                                <p>{patient.state || 'N/A'}</p>
                            )}
                        </div>
                    </div>

                    <hr />

                    {/* Medical Information */}
                    <h4>Medical Information</h4>
                    <div className="modal-row">
                        <div>
                            <strong>Assigned Doctor</strong>
                            {isEditing ? (
                                <input name="doctor" value={formData.doctor || ''} onChange={handleChange} />
                            ) : (
                                <p>{patient.doctor}</p>
                            )}
                        </div>
                        <div>
                            <strong>Condition</strong>
                            {isEditing ? (
                                <input name="condition" value={formData.condition || ''} onChange={handleChange} />
                            ) : (
                                <p>{patient.condition}</p>
                            )}
                        </div>
                    </div>
                    <div className="modal-row">
                        <div>
                            <strong>Medical Condition (Detailed)</strong>
                            {isEditing ? (
                                <input name="medicalCondition" value={formData.medicalCondition || ''} onChange={handleChange} />
                            ) : (
                                <p>{patient.medicalCondition || 'N/A'}</p>
                            )}
                        </div>
                    </div>
                    <div className="modal-row">
                        <div>
                            <strong>Description</strong>
                            {isEditing ? (
                                <textarea name="describeCondition" value={formData.describeCondition || ''} onChange={handleChange} rows="3" style={{ width: '100%' }} />
                            ) : (
                                <p>{patient.describeCondition || 'N/A'}</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="gray-btn" onClick={onClose}>Close</button>
                    {isEditing ? (
                        <>
                            <button className="save-btn" onClick={handleSave}>Save</button>
                            <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
                        </>
                    ) : (
                        <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit Details</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PatientModal;
