import { NavLink } from 'react-router-dom';
import "../styles/side-bar.css";

const SideBar = () => {
  return (
    <div className='wrapper'>
      {/* <h3 style={{ marginBottom: '1rem' }}>Menu</h3> */}
      <nav>
        <NavLink
          to="/"
          className='Link'
          style={{ textDecoration: "none", color: "#333" }}
        > 🏠︎ Dashboard
        </NavLink>
        <NavLink
          to="/appointments"
          className='Link'
          style={{ textDecoration: "none", color: "#333" }}
        > 🗓 Appointments
        </NavLink>
        <NavLink
          to="/doctors"
          className='Link'
          style={{ textDecoration: "none", color: "#333" }}
        > 🩺 Doctors
        </NavLink>
        <NavLink
          to="/patients"
          className='Link'
          style={{ textDecoration: "none", color: "#333" }}
        >👤 Patients
        </NavLink>
        <NavLink
          to="/reports"
          className='Link'
          style={{ textDecoration: "none", color: "#333" }}
        > 📊 Reports
        </NavLink>
        <NavLink
          to="/settings"
          className='Link'
          style={{ textDecoration: "none", color: "#333" }}
        > ⚙️Settings
        </NavLink>
      </nav>
    </div>
  );
};

export default SideBar;
