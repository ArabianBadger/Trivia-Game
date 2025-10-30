import express from "express";
import {
  getAllQuestions,
  getQuestionById,
  addNewQuestion,
  updateQuestion,
  deleteQuestion,
} from "./questionsModel.js";
import { validateQuestion } from "./questionsValidation.js";

const router = express.Router();


router.get("/", (req, res) => {
  res.json(getAllQuestions());
});


router.get("/:id", (req, res) => {
  const question = getQuestionById(parseInt(req.params.id));
  if (!question) return res.status(404).json({ error: "Question not found" });
  res.json(question);
});


router.post("/", validateQuestion, (req, res) => {
  const newQ = addNewQuestion(req.body);
  res.status(201).json(newQ);
});


router.put("/:id", validateQuestion, (req, res) => {
  const updated = updateQuestion(parseInt(req.params.id), req.body);
  if (!updated) return res.status(404).json({ error: "Question not found" });
  res.json(updated);
});


router.delete("/:id", (req, res) => {
  const success = deleteQuestion(parseInt(req.params.id));
  success
    ? res.json({ message: "Question deleted" })
    : res.status(404).json({ error: "Question not found" });
});

export default router;
