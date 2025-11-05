import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Question from './modules/questions/models/questionModel.js';

// Load environment variables
dotenv.config();

// Get the directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function importQuestions() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Read questions from JSON file
        const jsonPath = join(__dirname, 'data', 'questions.json');
        const questions = JSON.parse(await readFile(jsonPath, 'utf8'));

        // Remove IDs from the questions as MongoDB will generate its own
        const questionsToImport = questions.map(({ id, ...rest }) => rest);

        // Clear existing questions
        await Question.deleteMany({});

        // Import questions
        await Question.insertMany(questionsToImport);
        console.log('Questions imported successfully!');

        // Disconnect from MongoDB
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error importing questions:', error);
        process.exit(1);
    }
}

importQuestions();