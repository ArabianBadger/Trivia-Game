import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

export default function QuestionsList() {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      const res = await api.get("/questions");
      setQuestions(res.data);
    } catch (err) {
      setError("Failed to load questions");
    } finally {
      setLoading(false);
    }
  };

  const deleteQuestion = async (id) => {
    if (!window.confirm("Are you sure you want to delete this question?")) {
      return;
    }

    try {
      await api.delete(`/questions/${id}`);
      setQuestions(prev => prev.filter(q => q._id !== id));
      alert("Question deleted successfully!");
    } catch (err) {
      alert(err.response?.data?.error || "Failed to delete question. Make sure you're logged in as admin.");
    }
  };

  if (loading) return <div>Loading questions...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Questions</h2>
      <Link to="/admin/add" style={{ padding: "10px 20px", backgroundColor: "#007bff", color: "white", textDecoration: "none", borderRadius: "5px", display: "inline-block", marginBottom: "20px" }}>+ Add New Question</Link>

      {questions.length === 0 ? (
        <p>No questions found. Add your first question!</p>
      ) : (
        questions.map(q => (
        <div key={q._id} style={{ border: "1px solid gray", padding: 10, marginTop: 10 }}>
          <h3>{q.question}</h3>
          <p><strong>Category:</strong> {q.category}</p>
          <p><strong>Answer:</strong> {q.answer}</p>

          <Link to={`/admin/edit/${q._id}`} style={{ marginRight: "10px" }}>Edit</Link>
          <button onClick={() => deleteQuestion(q._id)} style={{ padding: "5px 10px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "3px", cursor: "pointer" }}>Delete</button>
        </div>
      ))
      )}
    </div>
  );
}
