import React from 'react'
import { Link } from 'react-router-dom'

const AvailabilityCard = () => {
  return (
      <div className="availability-container">
        <h1>Available Doctors</h1>
        <div className="action-buttons">
         <Link to="/doctors"> <button className="outline-btn">View Availability</button> </Link> 
        </div>
    </div>
  )
}

export default AvailabilityCard
