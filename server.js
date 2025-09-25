
const express = require("express");
const app = express();


app.use(express.json());




app.get("/", (req, res) => {
 
});

app.get("/questions", (req, res) => {
 
});

app.get("/questions/:id", (req, res) => {
 
});

app.post("/questions", (req, res) => {
 
});

app.delete("/questions/:id", (req, res) => {
  
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:3000`);
});
