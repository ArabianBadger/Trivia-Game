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

router.get("/", async (req, res, next) => {
  try {
    const { category, sort, page = 1, limit = 5 } = req.query;
    const filter = category ? { category } : {};
    const sortOption = sort ? { category: sort === "desc" ? -1 : 1 } : {};

    const questions = await getAllQuestions(filter, sortOption, page, limit);
    res.json(questions);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const question = await getQuestionById(req.params.id);
    if (!question) return res.status(404).json({ error: "Question not found" });
    res.json(question);
  } catch (error) {
    next(error);
  }
});

router.post("/", validateQuestion, async (req, res, next) => {
  try {
    const newQ = await addNewQuestion(req.body);
    res.status(201).json(newQ);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", validateQuestion, async (req, res, next) => {
  try {
    const updated = await updateQuestion(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Question not found" });
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await deleteQuestion(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Question not found" });
    res.json({ message: "Question deleted" });
  } catch (error) {
    next(error);
  }
});

export default router;

