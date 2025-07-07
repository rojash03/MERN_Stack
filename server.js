import express from "express";
import connectDB from "./config/database.js";
import userRoutes from "./routes/user.routes.js";
import employeeRoutes from "./routes/employee.routes.js";
import aurthRoutes from "./routes/aurth.route.js";

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("I am your first response from the server!");
});

app.get("/about", (req, res) => {
  res.send("I am your second response from the server!");
});

app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', employeeRoutes);
app.use('/api',aurthRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
