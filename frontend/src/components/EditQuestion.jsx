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

    await api.put(`/questions/${id}`, {
      ...form,
      choices: form.choices.split(",")
    });

    navigate("/admin");
  };

  return (
    <div>
      <h2>Edit Question</h2>

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

        <button type="submit">Update Question</button>
      </form>
    </div>
  );
}
