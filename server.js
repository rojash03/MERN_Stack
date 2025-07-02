import express from "express";
import connectDB from "./config/database.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

const PORT = 3000;



//mongodb+srv://Mern:Mern123@mern.mtspnyi.mongodb.net/?retryWrites=true&w=majority&appName=Mern

app.get("/", (req, res) => {
  res.send("I am your first response from the server!");
});

app.get("/about", (req, res) => {
  res.send("I am your second response from the server!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});