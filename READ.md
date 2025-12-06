 
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

Phase 5: Authentication & Authorization

In Phase 5, we added user authentication and role-based access control (RBAC) to secure the application.

-Backend Authentication Features

-modules/users/
    userModel.js > User schema with username, email, password (hashed with bcryptjs), and role fields.
    usersModel.js > Database functions for creating and finding users.
    usersRoutes.js > API routes for /auth/register and /auth/login.
    usersValidation.js > Validates registration and login data.

-middlewares/authMiddleware.js
    authenticateToken > Verifies JWT tokens from the Authorization header.
    authorizeRole > Checks if the user has the required role (e.g., admin).

-Protected Routes
    GET /questions > Public (anyone can view questions).
    POST /questions > Protected (admin only).
    PUT /questions/:id > Protected (admin only).
    DELETE /questions/:id > Protected (admin only).

-JWT Token System
    Tokens are generated on login and registration.
    Tokens expire after 7 days.
    Tokens must be sent in the Authorization header as "Bearer <token>".

-OTP Email Verification System
    After registration, the user's credentials are generated and an OTP is sent to the user's email.
    The user must enter the 6-digit OTP to verify their email before login.
    OTP expires after 10 minutes.
    Users can resend OTP if not received or expired.
    Only verified users can log in to the system.
    Backend logs OTP to console if email service is not configured (for development).

-Frontend Authentication Features

-context/AuthContext.jsx
    Manages authentication state across the app.
    Provides login, register, and logout functions.
    Stores JWT token and user data in localStorage.

-pages/Login.jsx & pages/Register.jsx
    User-friendly forms for authentication.
    Error handling for invalid credentials.
    Redirects to OTP verification page after registration.

-pages/VerifyOTP.jsx
    OTP verification page with 6-digit input.
    Resend OTP functionality.
    Automatic redirect after successful verification.

-components/ProtectedRoute.jsx
    Wraps routes that require authentication.
    Redirects to /login if user is not authenticated.
    Blocks access to admin pages if user is not an admin.

-components/Navbar.jsx
    Shows login/register links for guests.
    Shows username and logout button for authenticated users.
    Shows admin panel link for admin users.

-src/api.js
    Automatically includes JWT token in all API requests using axios interceptors.

-Test Credentials
    Admin User:
        Email: admin@trivia.com
        Password: admin123

-Scripts
    npm run create-admin > Creates an admin user in the database.
    npm run import-questions > Imports questions from JSON to MongoDB.
    npm start > Starts the backend server.

-Environment Variables (.env)
    MONGO_URI > MongoDB connection string.
    PORT > Server port (default: 5000).
    JWT_SECRET > Secret key for signing JWT tokens.
    EMAIL_HOST > SMTP host for sending emails (optional - for production).
    EMAIL_PORT > SMTP port (default: 587, optional).
    EMAIL_USER > Email account username (optional).
    EMAIL_PASS > Email account password (optional).
    EMAIL_FROM > Sender email address (optional).

Note: If email configuration is not provided, OTP will be displayed in the backend console for development/testing purposes.