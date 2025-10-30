 
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