import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

export default function QuestionsList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    api.get("/questions").then(res => setQuestions(res.data));
  }, []);

  const deleteQuestion = async (id) => {
    await api.delete(`/questions/${id}`);
    setQuestions(prev => prev.filter(q => q._id !== id));
  };

  return (
    <div>
      <h2>All Questions</h2>
      <Link to="/admin/add">+ Add New Question</Link>

      {questions.map(q => (
        <div key={q._id} style={{ border: "1px solid gray", padding: 10, marginTop: 10 }}>
          <h3>{q.question}</h3>
          <p><strong>Category:</strong> {q.category}</p>
          <p><strong>Answer:</strong> {q.answer}</p>

          <Link to={`/admin/edit/${q._id}`}>Edit</Link>
          <button onClick={() => deleteQuestion(q._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
