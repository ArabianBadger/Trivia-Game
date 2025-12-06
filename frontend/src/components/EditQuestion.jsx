import { useState, useEffect } from "react";
import api from "../api";
import { useNavigate, useParams } from "react-router-dom";

export default function EditQuestion() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    category: "",
    question: "",
    choices: "",
    answer: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get(`/questions/${id}`).then(res => {
      const q = res.data;
      setForm({
        category: q.category,
        question: q.question,
        choices: q.choices.join(","),
        answer: q.answer,
      });
    });
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.put(`/questions/${id}`, {
        ...form,
        choices: form.choices.split(",").map(c => c.trim())
      });
      alert("Question updated successfully!");
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update question. Make sure you're logged in as admin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Edit Question</h2>

      {error && <div style={{ color: "red", padding: "10px", marginBottom: "10px", backgroundColor: "#ffebee", borderRadius: "5px" }}>{error}</div>}

      <form onSubmit={submit}>
        <input 
          value={form.category}
          onChange={e => setForm({...form, category: e.target.value})}
        /><br/>

        <input 
          value={form.question}
          onChange={e => setForm({...form, question: e.target.value})}
        /><br/>

        <input 
          value={form.choices}
          onChange={e => setForm({...form, choices: e.target.value})}
        /><br/>

        <input 
          value={form.answer}
          onChange={e => setForm({...form, answer: e.target.value})}
        /><br/>

        <button type="submit" disabled={loading} style={{ padding: "10px 20px", marginTop: "10px", cursor: loading ? "not-allowed" : "pointer" }}>
          {loading ? "Updating..." : "Update Question"}
        </button>
      </form>
    </div>
  );
}
