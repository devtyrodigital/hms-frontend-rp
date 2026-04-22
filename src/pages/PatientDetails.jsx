import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePatients } from '../context/PatientsContext';
import "../styles/patient-details.css";

const PatientDetails = () => {
  const { id } = useParams(); // get patient id from URL
  const navigate = useNavigate();
  const { patientsData } = usePatients();

  // find patient based on ID
  const patient = patientsData.find((p) => p.id === id);

  if (!patient) {
    return (
      <div className="patient-details">
        <h2>Patient not found</h2>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="patient-details">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

      <h2>Patient Details</h2>
      <div className="details-card">
        <p><strong>Patient ID:</strong> {patient.id}</p>
        <p><strong>Name:</strong> {patient.name}</p>
        <p><strong>Age:</strong> {patient.age}</p>
        <p><strong>Date of Birth:</strong> {patient.dob}</p>
        <p><strong>Doctor:</strong> {patient.doctor}</p>
        <p><strong>Condition:</strong> {patient.condition}</p>
        <p><strong>Medical Condition:</strong> {patient.medicalCondition}</p>
        <p><strong>Description:</strong> {patient.describeCondition}</p>
        <p><strong>Blood Group:</strong> {patient.bloodGroup}</p>
        <p><strong>Weight:</strong> {patient.weight}</p>
        <p><strong>Height:</strong> {patient.height}</p>
        <p><strong>Marital Status:</strong> {patient.maritalStatus}</p>
        <p><strong>Address:</strong> {patient.address}</p>
        <p><strong>City:</strong> {patient.city}</p>
        <p><strong>State:</strong> {patient.state}</p>
        <p><strong>Contact:</strong> {patient.contact}</p>
        <p><strong>WhatsApp:</strong> {patient.contactWhatsapp}</p>
        <p><strong>Email:</strong> {patient.email}</p>
      </div>
    </div>
  );
};

export default PatientDetails;
