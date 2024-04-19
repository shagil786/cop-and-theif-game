import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ChooseCity.module.css"; // Import module CSS
import ChooseCop from "../ChooseCop/ChooseCop";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkCapture } from "../../utils/api";

interface Cop {
  image: string;
  vehicle: string;
  city: string;
}

interface City {
  image: string;
  under: string;
}

interface Props {
  copData: Cop[];
  setCopData: any;
  selectedCop: number;
  setSelectedCop: any;
  cityData: City[];
  setCityData: any;
  setResult: any;
}

const ChooseCity: React.FC<Props> = ({
  copData,
  setCopData,
  selectedCop,
  setSelectedCop,
  cityData,
  setCityData,
  setResult,
}) => {
  const [hoveredIndexx, setHoveredIndexx] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleMouseEnterr = (index: number) => {
    setHoveredIndexx(index);
  };

  const handleChooseCity = (index: number) => {
    const updatedCopData: any = [...copData];
    const selectedCity: any = cityData[index];
    const selectedCop_: any = updatedCopData[selectedCop];

    // Update the selected cop's city and distance
    selectedCop_.city = selectedCity.name;
    selectedCop_.distance = selectedCity.distance;

    // Update the cop data state
    setCopData(updatedCopData);

    // Update the city data state to reflect the cop's assignment
    const updatedCityData = [...cityData];
    updatedCityData[index].under = selectedCop_.name;

    // Clear previous assignments if any
    updatedCityData.forEach((city, ind) => {
      if (ind !== index && city.under === selectedCop_.name) {
        updatedCityData[ind].under = "";
      }
    });

    // Update the city data state
    setCityData(updatedCityData);
  };

  const validate = () => {
    const finalResult = copData.filter((res) => {
      return res.city && res?.vehicle;
    });
    return finalResult.length === 3;
  };

  const handleGo = async () => {
    if (validate()) {
      setLoading(true);
      checkCapture(copData[0], copData[1], copData[2])
        .then((res) => {
          setResult(res);
          navigate("/result");
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          toast(error.message);
        });
    } else {
      toast("Select the city and vehicle for all the cops to proceed!", {
        theme: "dark",
      });
    }
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
        <h2 className={styles.header}>Select City</h2>
        <div className={styles.container}>
          {cityData?.map((data, index) => (
            <div
              key={index}
              className={`${styles.card} ${
                hoveredIndexx === index ? styles.selectedCard : ""
              }`}
              onClick={() => {
                handleChooseCity(index);
                handleMouseEnterr(index);
              }}
            >
              <div className={styles.imageWrapper}>
                <img src={data?.image} alt="city" width="100%" />
              </div>
              <p className={styles.text}>
                {data?.under ? data?.under : "Available"}
              </p>
            </div>
          ))}
        </div>
        <div className={styles.buttonContainer}>
          <button
            onClick={() => navigate("/chooseVechile")}
            className={styles.button}
          >
            BACK
          </button>
          <button onClick={handleGo} className={styles.button}>
            {loading ? "Loading..." : "GO"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChooseCity;
