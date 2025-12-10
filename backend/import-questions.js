import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Question from './modules/questions/models/questionmodel.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function importQuestions() {
    try {

        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const jsonPath = join(__dirname, 'data', 'questions.json');
        const questions = JSON.parse(await readFile(jsonPath, 'utf8'));

        const questionsToImport = questions.map(({ id, ...rest }) => rest);

        await Question.deleteMany({});

        await Question.insertMany(questionsToImport);
        console.log('Questions imported successfully!');

        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error importing questions:', error);
        process.exit(1);
    }
}

importQuestions();