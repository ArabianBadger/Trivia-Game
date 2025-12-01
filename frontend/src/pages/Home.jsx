import React, { useEffect, useState } from "react";
import api from "../api";

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await api.get("/questions");
        setQuestions(res.data || []);
      } catch (err) {
        console.error("ERROR loading questions", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <h2>Loading...</h2>;

  const startGame = () => {
    if (questions.length === 0) {
      alert("No questions found in database.");
      return;
    }
    setGameStarted(true);
  };

  const selectAnswer = (choice) => {
    setSelectedAnswer(choice);
  };

  const nextQuestion = () => {
    if (selectedAnswer === questions[currentIndex].answer) {
      setScore(score + 1);
    }

    setSelectedAnswer(null);

    if (currentIndex + 1 === questions.length) {
      setShowResult(true); 
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (!gameStarted) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Trivia Game</h1>
        <button
          style={{
            padding: "10px 20px",
            fontSize: "18px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
          }}
          onClick={startGame}
        >
          Start Game
        </button>
      </div>
    );
  }

  if (showResult) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Game Over!</h1>
        <h2>Your Score: {score} / {questions.length}</h2>
      </div>
    );
  }

  const q = questions[currentIndex];

  return (
    <div style={{ width: "70%", margin: "40px auto", textAlign: "center" }}>
      <h2>Question {currentIndex + 1} of {questions.length}</h2>

      <h3 style={{ marginBottom: "20px" }}>{q.question}</h3>

      <div>
        {q.choices.map((choice, i) => (
          <button
            key={i}
            onClick={() => selectAnswer(choice)}
            style={{
              display: "block",
              margin: "10px auto",
              padding: "10px 20px",
              width: "60%",
              background:
                selectedAnswer === choice ? "#28a745" : "#f0f0f0",
              color: selectedAnswer === choice ? "white" : "black",
              borderRadius: "8px",
              border: "1px solid #ccc",
              cursor: "pointer",
            }}
          >
            {choice}
          </button>
        ))}
      </div>

      <button
        onClick={nextQuestion}
        disabled={!selectedAnswer}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: selectedAnswer ? "#007bff" : "gray",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: selectedAnswer ? "pointer" : "not-allowed",
        }}
      >
        Next
      </button>
    </div>
  );
}
