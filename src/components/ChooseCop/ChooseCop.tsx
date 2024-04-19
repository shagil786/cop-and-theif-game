import React, { useState } from "react";
import styles from "./ChooseCop.module.css"; // Import module CSS
import { useNavigate } from "react-router-dom";

interface Cop {
  image: string;
  vehicle: string;
  city: string;
}

interface Props {
  copData: Cop[];
  selectedCop: number;
  setSelectedCop: any;
}

const ChooseCop: React.FC<Props> = ({
  copData,
  selectedCop,
  setSelectedCop,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleChooseCop = (index: number) => {
    setSelectedCop(index);
  };

  return (
    <div className={styles.mainContainer}>
      <h2 style={{ color: "#caf0f8", fontSize: "3rem" }}>Select Cop </h2>
      <div className={styles.container}>
        {copData?.map((data, index) => (
          <div
            key={index}
            className={`${styles.card} ${
              selectedCop === index ? styles.selectedCard : ""
            }`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => handleChooseCop(index)}
          >
            <div style={{ width: "150px", height: "100%" }}>
              <img src={data?.image} alt="cop" className={styles?.imageStyle} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseCop;
