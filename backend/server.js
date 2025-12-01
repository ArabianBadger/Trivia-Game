import express from "express";
import dotenv from "dotenv";
import connectDB from "./shared/middlewares/connect-db.js";
import questionsRoutes from "./modules/questions/questionsRoutes.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";
import errorHandler from "./middlewares/errorHandler.js";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/questions", questionsRoutes);


app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));