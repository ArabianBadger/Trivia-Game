import React, { useState, useEffect } from "react";
import api from "../api";

export default function Play() {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (started) {
      api.get("/questions").then((res) => {
        setQuestions(res.data);
      });
    }
  }, [started]);

  if (!started) {
    return (
      <div style={styles.center}>
        <h1>Trivia Game</h1>
        <button style={styles.btn} onClick={() => setStarted(true)}>
          Start Game
        </button>
      </div>
    );
  }

  if (questions.length === 0) return <h2>Loading...</h2>;

  const current = questions[index];

  function checkAnswer(choice) {
    setSelected(choice);

    if (choice === current.answer) {
      setScore(score + 1);
    }
  }

  function next() {
    setSelected(null);
    setIndex(index + 1);
  }

  if (index >= questions.length) {
    return (
      <div style={styles.center}>
        <h1>Game Over!</h1>
        <h2>Your Score: {score} / {questions.length}</h2>
        <button style={styles.btn} onClick={() => window.location.reload()}>
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div style={styles.gameBox}>
      <h2>{current.question}</h2>

      {current.choices.map((choice, i) => (
        <button
          key={i}
          onClick={() => checkAnswer(choice)}
          style={{
            ...styles.choice,
            backgroundColor:
              selected === null
                ? "white"
                : choice === current.answer
                ? "lightgreen"
                : choice === selected
                ? "lightcoral"
                : "white"
          }}
        >
          {choice}
        </button>
      ))}

      {selected && (
        <button style={styles.nextBtn} onClick={next}>
          Next Question
        </button>
      )}
    </div>
  );
}

const styles = {
  center: {
    textAlign: "center",
    marginTop: "80px"
  },
  btn: {
    padding: "12px 25px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "18px"
  },
  gameBox: {
    width: "70%",
    margin: "40px auto",
    textAlign: "center",
    padding: "20px",
    borderRadius: "12px",
    background: "#f5f5f5"
  },
  choice: {
    display: "block",
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    fontSize: "18px",
    cursor: "pointer"
  },
  nextBtn: {
    marginTop: "20px",
    padding: "12px 25px",
    background: "black",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  }
};
