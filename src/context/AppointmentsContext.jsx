import React, { createContext, useContext, useState } from "react";
import appointmentsData from "../data/AppointmentsData";

const AppointmentsContext = createContext();

export const useAppointments = () => useContext(AppointmentsContext);

export const AppointmentsProvider = ({ children }) => {
    const [appointments, setAppointments] = useState(appointmentsData);

    return (
        <AppointmentsContext.Provider value={{ appointments, setAppointments }}>
            {children}
        </AppointmentsContext.Provider>
    );
};
