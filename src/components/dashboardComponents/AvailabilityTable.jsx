import React from "react";
import "../../styles/availability-table.css";
import { useDoctors } from "../../context/DoctorsContext"; // import context hook

const AvailabilityTable = () => {
  const { doctorsData } = useDoctors(); // fetch doctors from context

  return (
    <div className="availability-table-container">
      <table className="availability-table">
        <thead>
          <tr>
            <th>Doctor</th>
            <th>Speciality</th>
            <th>Today's Appointments</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {doctorsData.map((doctor, index) => (
            <tr key={index}>
              <td>{doctor.name}</td>
              <td>{doctor.speciality}</td>
              <td>{doctor.todays_appointments || 0}</td>
              <td>
                <span
                  className={`status-badge ${doctor.status ? doctor.status.toLowerCase() : "pending"
                    }`}
                >
                  {doctor.status || "Pending"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AvailabilityTable;
