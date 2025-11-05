import Question from "./models/questionModel.js";

export async function getAllQuestions(filter = {}) {
  return await Question.find(filter);
}

export async function getQuestionById(id) {
  return await Question.findById(id);
}

export async function addNewQuestion(data) {
  const newQ = new Question(data);
  return await newQ.save();
}

export async function updateQuestion(id, data) {
  return await Question.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteQuestion(id) {
  return await Question.findByIdAndDelete(id);
}
