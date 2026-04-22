import React, { createContext, useContext, useState } from "react";
import patientsDataImport from "../data/PatientsData";

const PatientsContext = createContext();

export const usePatients = () => useContext(PatientsContext);

export const PatientsProvider = ({ children }) => {
    const [patientsData, setPatientsData] = useState(patientsDataImport);

    return (
        <PatientsContext.Provider value={{ patientsData, setPatientsData }}>
            {children}
        </PatientsContext.Provider>
    );
};
