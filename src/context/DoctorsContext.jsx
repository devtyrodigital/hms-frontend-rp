import React, { createContext, useContext, useState } from "react";
import doctorsDataImport from "../data/Doctors";

const DoctorsContext = createContext();

export const useDoctors = () => useContext(DoctorsContext);

export const DoctorsProvider = ({ children }) => {
    const [doctorsData, setDoctorsData] = useState(doctorsDataImport);

    return (
        <DoctorsContext.Provider value={{ doctorsData, setDoctorsData }}>
            {children}
        </DoctorsContext.Provider>
    );
};
