import React from 'react'
import DashboardStats from '../components/dashboardComponents/DashboardStats'
import DashboardAppointments from "../components/dashboardComponents/DashboardAppointments"
import DashboardAvailability from '../components/dashboardComponents/DashboardAvailability'
DashboardAvailability

const Dashboard = () => {
  return (
    <div>
      <DashboardStats />
      <DashboardAppointments />
      <DashboardAvailability />
    </div>
  )
}

export default Dashboard
