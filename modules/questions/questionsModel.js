import fs from "fs";
import path from "path";

const filePath = path.resolve("data/questions.json");


export function getAllQuestions() {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}


export function getQuestionById(id) {
  const data = getAllQuestions();
  return data.find((q) => q.id === id);
}


export function addNewQuestion(newQuestion) {
  const data = getAllQuestions();
  const newId = data.length ? data[data.length - 1].id + 1 : 1;
  const question = { id: newId, ...newQuestion };
  data.push(question);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return question;
}


export function updateQuestion(id, updated) {
  const data = getAllQuestions();
  const index = data.findIndex((q) => q.id === id);
  if (index === -1) return null;
  data[index] = { ...data[index], ...updated };
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return data[index];
}


export function deleteQuestion(id) {
  const data = getAllQuestions();
  const filtered = data.filter((q) => q.id !== id);
  fs.writeFileSync(filePath, JSON.stringify(filtered, null, 2));
  return filtered.length < data.length;
}
