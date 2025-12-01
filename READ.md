 
 -Group

    Names: Abdulrahman Ghazal , My Uyen Nguyen,

-Work Distribution

    modules was worked on by My Uyen.
    middleswares were worked on by Abdulrahman.
    rest was a collective effort. 
 
 
 
 -server.js

    This is the main file that runs the app.  
    It connects all routes and adds middlewares for error handling and 404 pages.

 -data/questions.json

    This is my database it stores trivia questions in JSON format.

 -modules/questions/

    This folder holds all the logic for the trivia feature.

    questionsModel.j > Handles reading, adding, updating, and deleting questions from the JSON file.  
    questionsRoutes.js > Handles the API routes like /questions, /questions/:id.  
    questionsValidation.js > Uses express-validator to check if users send valid data.

 -middlewares/
    errorHandler.js > Shows a message when there’s a server error.  
    notFoundHandler.js > Shows a message if a route doesn’t exist.

 Phase 4 Add-On

-frontend/

    In Phase 4 we added the React frontend.
    This is what the user sees when they play the trivia game.

-src/App.jsx
    This handles the page routing for Home page and Admin page.

-src/api.js
    This connects the frontend to the backend using axios.

-src/pages/Home.jsx
    This is the gameplay screen.
    It loads all questions from the backend and lets the user start the trivia game.

-src/pages/Admin.jsx
    This page is for managing questions (add, edit, delete).

-src/components/
    QuestionsList.jsx > Shows all questions.
    AddQuestion.jsx > Lets you add new questions.
    EditQuestion.jsx > Lets you update old questions.

-import-questions.js
    This file was added to import all the JSON questions into MongoDB.
    It helped us move from JSON storage to a real database.