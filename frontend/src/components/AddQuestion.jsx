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

  const submit = async (e) => {
    e.preventDefault();

    await api.post("/questions", {
      ...form,
      choices: form.choices.split(",")
    });

    navigate("/admin");
  };

  return (
    <div>
      <h2>Add Question</h2>

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

        <button type="submit">Add Question</button>
      </form>
    </div>
  );
}
