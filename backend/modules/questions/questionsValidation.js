import { body, validationResult } from "express-validator";

export const validateQuestion = [
  body("category").notEmpty().withMessage("Category is required"),
  body("question").notEmpty().withMessage("Question is required"),
  body("choices")
    .isArray({ min: 2 })
    .withMessage("Choices must be an array with at least 2 items"),
  body("answer").notEmpty().withMessage("Answer is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
