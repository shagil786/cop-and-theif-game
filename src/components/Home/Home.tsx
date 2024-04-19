import React from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const { container } = styles;
  const navigate = useNavigate();

  return (
    <div className={container}>
      <h2>Welcome Player</h2>
      <p>Press Play To Enter The Story Mode</p>
      <button onClick={() => navigate("/About")}>PLAY</button>
    </div>
  );
};

export default Home;
