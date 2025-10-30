import express from "express";
import questionsRoutes from "./modules/questions/questionsRoutes.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";
import errorHandler from "./middlewares/errorHandler.js";

const express = require("express");
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/questions", questionsRoutes);


app.use(notFoundHandler);
app.use(errorHandler);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:3000`);
});
