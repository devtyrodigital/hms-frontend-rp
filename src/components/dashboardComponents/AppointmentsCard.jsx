import React from 'react';
import '../../styles/appointments-card.css';
import { Link, useNavigate } from 'react-router-dom';

const AppointmentsCard = () => {
  const navigate = useNavigate(); // <-- hook at top level

  const handleFilterAppointmentsbtn = (filter) => {
    // navigate to /appointments and pass a filter query param (optional)
    navigate(`/appointments${filter ? `?filter=${filter}` : ''}`);
  };
   const redirecttoPP = () =>{
    window.location.replace('http://localhost:5174/')
  }


  return (
    <div className="appointments-container">
      <h1>Manage Appointments</h1>

      <div className="action-buttons">
        <Link to="/appointments">
          <button type="button" className="outline-btn">View All Appointments</button>
        </Link>

        <Link to="/appointments/create">
          <button type="button" className="solid-btn" onClick={()=>redirecttoPP()}>Create Appointment</button>
        </Link>
      </div>

      <div className="filter-buttons">
        {/* pass a function to onClick — do NOT call the handler here */}
        <button type="button" className="filter-btn" onClick={() => handleFilterAppointmentsbtn('today')}>
          Today
        </button>

        <button type="button" className="filter-btn" onClick={() => handleFilterAppointmentsbtn('week')}>
          This Week
        </button>

        <button type="button" className="filter-btn" onClick={() => handleFilterAppointmentsbtn('upcoming')}>
          Upcoming
        </button>
      </div>
    </div>
  );
};

export default AppointmentsCard;
