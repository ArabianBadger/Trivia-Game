import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function AddQuestion() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    category: "",
    question: "",
    choices: "",
    answer: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/questions", {
        ...form,
        choices: form.choices.split(",").map(c => c.trim())
      });
      alert("Question added successfully!");
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add question. Make sure you're logged in as admin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Add Question</h2>

      {error && <div style={{ color: "red", padding: "10px", marginBottom: "10px", backgroundColor: "#ffebee", borderRadius: "5px" }}>{error}</div>}

      <form onSubmit={submit}>
        <input 
          placeholder="Category"
          onChange={e => setForm({...form, category: e.target.value})}
        /><br/>

        <input 
          placeholder="Question"
          onChange={e => setForm({...form, question: e.target.value})}
        /><br/>

        <input 
          placeholder="Choices (comma separated)"
          onChange={e => setForm({...form, choices: e.target.value})}
        /><br/>

        <input 
          placeholder="Answer"
          onChange={e => setForm({...form, answer: e.target.value})}
        /><br/>

        <button type="submit" disabled={loading} style={{ padding: "10px 20px", marginTop: "10px", cursor: loading ? "not-allowed" : "pointer" }}>
          {loading ? "Adding..." : "Add Question"}
        </button>
      </form>
    </div>
  );
}
