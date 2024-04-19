import React, { useEffect, useState } from "react";
import styles from "./Result.module.css";
import { useNavigate } from "react-router-dom";

interface ResultProps {
  result: { copName: string; caputreStatus: boolean; message: string };
}

const Result: React.FC<ResultProps> = ({ result }) => {
  const [isFlickering, setIsFlickering] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const flickerInterval = setInterval(() => {
      setIsFlickering((prev) => !prev);
    }, 500); // Adjust flicker speed here

    return () => clearInterval(flickerInterval);
  }, []);

  return (
    <div className={styles.result}>
      <h2 className={styles.title}>Game Result</h2>
      <h3 className={`${styles.message} ${isFlickering ? styles.flicker : ""}`}>
        {result.caputreStatus ? "Congratulations!" : "Oops!"} {result?.copName}
      </h3>
      <p className={styles.description}>
        {result.caputreStatus
          ? "You won the game!"
          : "You lost the game. Better luck next time!"}
      </p>
      <button onClick={() => navigate("/About")} className={styles.button}>
        PLAY AGAIN
      </button>
    </div>
  );
};

export default Result;
