import React, { createContext, useState } from 'react';

// Create context
export const MedicineContext = createContext();

// Provider component
export const MedicineProvider = ({ children }) => {
  const [medicines, setMedicines] = useState([]);

  // Add medicine
  const addMedicine = (medicine) => {
    setMedicines([...medicines, medicine]);
  };

  // Delete medicine
  const deleteMedicine = (id) => {
    setMedicines(medicines.filter(medicine => medicine.id !== id));
  };

  // Update medicine
  const updateMedicine = (updatedMedicine) => {
    setMedicines(medicines.map(med => med.id === updatedMedicine.id ? updatedMedicine : med));
  };

  return (
    <MedicineContext.Provider value={{ medicines, addMedicine, deleteMedicine, updateMedicine }}>
      {children}
    </MedicineContext.Provider>
  );
};
