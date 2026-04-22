import React from 'react';
import '../../styles/dashboard-stats.css';
import { useAppointments } from '../../context/AppointmentsContext';
import { useDoctors } from '../../context/DoctorsContext';
import { usePatients } from '../../context/PatientsContext';

const DashboardStats = () => {
  const { appointments } = useAppointments();
  const { doctorsData } = useDoctors();
  const { patientsData } = usePatients();

  // Calculate dynamic stats from context data
  const todaysAppointments = appointments.length;
  const availableDoctors = doctorsData.filter(doc => doc.status === 'Active').length;
  const totalPatients = patientsData.length;

  const stats = [
    {
      title: "Today's Appointments",
      value: todaysAppointments,
      change: `+${Math.floor(todaysAppointments * 0.33)}`
    },
    {
      title: "Available Doctors",
      value: availableDoctors,
      change: doctorsData.length - availableDoctors > 0 ? `-${doctorsData.length - availableDoctors}` : "0"
    },
    {
      title: "Total Patients",
      value: totalPatients,
      change: `+${Math.floor(totalPatients * 0.04)}`
    },
    {
      title: "Revenue Generated",
      value: "$1,200",
      change: "+$200"
    }
  ];

  return (
    <div className="dashboard-container">
      <h2>Welcome back! Here's what's happening today.</h2>
      <div className="cards-container">
        {stats.map((item, index) => (
          <div className="card" key={index}>
            <div className="card-title">{item.title}</div>
            <div className="card-value">{item.value}</div>
            <div className="card-change">{item.change}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardStats;
