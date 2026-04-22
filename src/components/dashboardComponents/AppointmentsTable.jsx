import React from "react";
import "../../styles/appointments-table.css";
import { useAppointments } from "../../context/AppointmentsContext";

const AppointmentsTable = () => {
  const { appointments } = useAppointments();

  console.log("Dashboard Appointments rendered");

  return (
    <div className="appointment-table-container">
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Condition</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((a, index) => (
            <tr key={index}>
              <td>{a.time}</td>
              <td>{a.name}</td>
              <td>{a.doctor}</td>
              <td>{a.condition}</td>
              <td>
                <span className={`status ${a.status.toLowerCase()}`}>
                  {a.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentsTable;
