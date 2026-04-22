import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from "./pages/Dashboard.jsx";
import Appointments from "./pages/Appointments.jsx";
import Doctors from "./pages/Doctors.jsx";
import Patients from "./pages/Patients.jsx";
import Reports from "./pages/Reports.jsx";
import Settings from "./pages/Settings.jsx";
import MainLayout from './layout/MainLayout.jsx';
import ErrorBoundary from "./components/ErrorBoundary.jsx"
import PatientDetails from './pages/PatientDetails.jsx';
import AddPatient from './pages/AddPatient.jsx';
import BookAppointment from './pages/BookAppointment.jsx';
import { PatientsProvider } from './context/PatientsContext';
import { DoctorsProvider } from "./context/DoctorsContext.jsx";
import { AppointmentsProvider } from './context/AppointmentsContext.jsx';
const App = () => {

  // useEffect(() => {
  //   fetch('/api/check-connection')
  //     .then(res => {
  //       if (!res.ok) {
  //         throw new Error(`Server responded with ${res.status}`);
  //       }
  //       return res.json(); // only try parsing if status is OK
  //     })
  //     .then(data => {
  //       console.log(data.message); // ✅ Expected success message
  //     })
  //     .catch(err => {
  //       console.error('❌ Backend connection failed:', err);
  //     });
  // }, []);

  return (
    <>
      <ErrorBoundary>
        <PatientsProvider>
          <DoctorsProvider>
            <AppointmentsProvider> {/*  // Patients Context Provider wrap */}
              <Routes>
                <Route path="/" element={<MainLayout />} >
                  <Route index element={<Dashboard />} />
                  <Route path="/appointments" element={<Appointments />} />
                  <Route path="/doctors" element={<Doctors />} />
                  <Route path="/patients" element={<Patients />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/PatientDetails/:id" element={<PatientDetails />} />
                  <Route path="/add-patient" element={<AddPatient />} />
                  <Route path="/book-appointment" element={<BookAppointment />} />
                  <Route path="/patients" element={<Patients />} />
                </Route>
              </Routes>
            </AppointmentsProvider>
          </DoctorsProvider>
        </PatientsProvider>
      </ErrorBoundary>
    </>
  )
}

export default App
