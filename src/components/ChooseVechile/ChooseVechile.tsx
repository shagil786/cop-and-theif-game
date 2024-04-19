import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChooseCop from "../ChooseCop/ChooseCop";
import styles from "./ChooseVechile.module.css"; // Import module CSS

interface Cop {
  image: string;
  vehicle: string;
  city: string;
}

interface Props {
  copData: Cop[];
  setCopData: any;
  selectedCop: number;
  setSelectedCop: any;
  vehicleData: any[];
  setVehicleData: any;
}

const ChooseVechile: React.FC<Props> = ({
  copData,
  setCopData,
  selectedCop,
  setSelectedCop,
  vehicleData,
  setVehicleData,
}) => {
  const [hoveredIndexx, setHoveredIndexx] = useState<number | null>(null);
  const navigate = useNavigate();
  const handleChooseVehicle = (index: number) => {
    const updatedCopData: any = [...copData];
    const selectedVehicle: any = vehicleData[index];
    const selectedCop_: any = updatedCopData[selectedCop];

    // Update the selected cop's vehicle and range
    selectedCop_.vehicle = selectedVehicle.name;
    selectedCop_.range = selectedVehicle.range;

    // Update the cop data state
    setCopData(updatedCopData);

    // Update the vehicle data state to reflect the cop's assignment
    const updatedVehicleData = [...vehicleData];
    updatedVehicleData[index].under = selectedCop_.name;

    // Clear previous assignments if any
    updatedVehicleData.forEach((vehicle, ind) => {
      if (ind !== index && vehicle.under === selectedCop_.name) {
        updatedVehicleData[ind].under = "";
      }
    });

    // Update the vehicle data state
    setVehicleData(updatedVehicleData);
  };

  return (
    <div className={styles.wrapper}>
      <ChooseCop
        selectedCop={selectedCop}
        copData={copData}
        setSelectedCop={setSelectedCop}
      />
      <div className={styles.border}></div>
      <div className={styles.content}>
        <h2 style={{ color: "#caf0f8", fontSize: "3em" }}>Select Vehicle </h2>
        <div className={styles.container}>
          {vehicleData?.map((data, index) => (
            <div
              key={index}
              className={`${styles.card} ${
                hoveredIndexx === index ? styles.selectedCard : ""
              }`}
              onClick={() => {
                handleChooseVehicle(index);
                setHoveredIndexx(index);
              }}
            >
              <div style={{ width: "150px" }}>
                <img src={data?.image} alt="vehicle" width="100%" />
              </div>
              <p style={{ fontSize: "1rem" }}>
                {data?.under ? data?.under : "Available"}
              </p>
            </div>
          ))}
        </div>

        <div className={styles.buttonContainer}>
          <button
            onClick={() => navigate("/About")}
            style={{
              color: "#caf0f8",
              fontSize: "2rem",
              fontFamily: "Silkscreen",
              background: "#03045e",
              borderStyle: "none",
              borderRadius: "10px",
              width: "40%",
              padding: "10px",
            }}
          >
            BACK
          </button>
          <button
            onClick={() => navigate("/ChooseCity")}
            style={{
              color: "#caf0f8",
              fontSize: "2rem",
              fontFamily: "Silkscreen",
              background: "#03045e",
              borderStyle: "none",
              borderRadius: "10px",
              width: "40%",
              padding: "10px",
            }}
          >
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChooseVechile;
