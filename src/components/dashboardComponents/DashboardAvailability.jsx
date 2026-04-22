import React from 'react'
import AvailabilityCard from './AvailabilityCard';
import AvailabilityTable from "./AvailabilityTable";

const DashboardAvailability = () => {
  return (
   <section style={{ padding:'2rem 2rem', display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{  border: "1px solid lightGrey", width: "55%" }}>
        <AvailabilityTable />
      </div>
      <div style={{ width: "40%" }}>
        <AvailabilityCard />
      </div>
    </section>
  )
}

export default DashboardAvailability
