import React, { useEffect, useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import ChooseCop from "./components/ChooseCop/ChooseCop";
import ChooseCity from "./components/ChooseCity/ChooseCity";
import Result from "./components/Result/Result";
import david from "./assets/david.png";
import jane from "./assets/jane.png";
import michael from "./assets/michael.png";
import bike from "./assets/bike.png";
import car from "./assets/car.png";
import suv from "./assets/suv.png";
import city_1 from "./assets/city_1.png";
import city_2 from "./assets/city_2.png";
import city_3 from "./assets/city_3.png";
import city_4 from "./assets/city_4.png";
import city_5 from "./assets/city_5.png";
import ChooseVechile from "./components/ChooseVechile/ChooseVechile";
import { getCities, getVechiles } from "./utils/api";

const App = () => {
  const [selectedCop, setSelectedCop] = useState(0);
  const [result, setResult] = useState<any>();

  const [copData, setCopData] = useState([
    {
      id: 0,
      name: "David",
      city: "",
      vehicle: "",
      range: "",
      distance: "",
      image: david,
    },
    {
      id: 1,
      name: "Jane",
      city: "",
      vehicle: "",
      range: "",
      distance: "",
      image: jane,
    },
    {
      id: 2,
      name: "Miachel",
      city: "",
      vehicle: "",
      range: "",
      distance: "",
      image: michael,
    },
  ]);

  const images = [bike, bike, car, suv];
  const images1 = [city_1, city_2, city_3, city_4, city_5];

  const [vehicleData, setVehicleData] = useState([]);
  const [cityData, setCityData] = useState<any>([]);

  useEffect(() => {
    getVechiles()
      .then((res) => {
        res?.vechiles?.forEach((each: any, index: any) => {
          each["id"] = index;
          each["under"] = "";
          each["image"] = images[index];
        });
        setVehicleData(res?.vechiles);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    getCities()
      .then((res) => {
        res?.cities?.forEach((each: any, index: any) => {
          each["id"] = index;
          each["under"] = "";
          each["image"] = images1[index];
        });
        setCityData(res?.cities);
      })
      .catch((err) => {});
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/About" element={<About />}></Route>
        <Route
          path="/ChooseVechile"
          element={
            <ChooseVechile
              selectedCop={selectedCop}
              setVehicleData={setVehicleData}
              copData={copData}
              vehicleData={vehicleData}
              setSelectedCop={setSelectedCop}
              setCopData={setCopData}
            />
          }
        ></Route>
        <Route
          path="/ChooseCity"
          element={
            <ChooseCity
              cityData={cityData}
              setCityData={setCityData}
              selectedCop={selectedCop}
              copData={copData}
              setSelectedCop={setSelectedCop}
              setCopData={setCopData}
              setResult={setResult}
            />
          }
        ></Route>
        <Route path="/result" element={<Result result={result} />}></Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
