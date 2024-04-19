import React, { useEffect, useRef, useState } from "react";
import styles from "./About.module.css";
import { useNavigate } from "react-router-dom";
import thief from "../../assets/thief.png";

interface AboutProps {}

const About: React.FC<AboutProps> = () => {
  const { container, imageContainer, textContainer, button, mainContainer } =
    styles;
  const navigate = useNavigate();

  return (
    <div className={mainContainer}>
      <div className={container}>
        <div className={imageContainer}>
          <img src={thief} alt="thief" />
        </div>
        <div className={textContainer}>
          <p>
            A notorious criminal escape artist has vanished again. However, the
            criminal may be hiding in only one of the possible 5 neighbouring
            cities. 3 fearless cops have volunteered in capturing the fugitive
            hiding and they need your help!
          </p>
          <button onClick={() => navigate("/chooseVechile")} className={button}>
            Catch Thief
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
