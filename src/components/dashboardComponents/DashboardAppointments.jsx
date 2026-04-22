import React from 'react'
import AppointmentsCard from './AppointmentsCard'
import AppointmentsTable from "./AppointmentsTable"

const DashboardAppointments = () => {
  return (
    <section style={{ padding:'2rem 2rem', display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ width: "45%" }}>
        <AppointmentsCard />
      </div>
      <div style={{ border: "1px solid lightGrey", width: "55%" }}>
        <AppointmentsTable />
      </div>
    </section>

  )
}

export default DashboardAppointments
