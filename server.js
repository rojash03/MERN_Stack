import express from "express";
import connectDB from "./config/database.js";
import userRoutes from "./routes/user.routes.js";
import employeeRoutes from "./routes/employee.routes.js";
import aurthRoutes from "./routes/aurth.route.js";
import { profileMiddLeWare } from "./middleWare/middleware.js";
import { verifyHR, verifyUser } from "./middleWare/verify.token.js";

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("I am your first response from the server!");
});

app.get("/about", (req, res) => {
  res.send("I am your second response from the server!");
});

app.get("/profile", profileMiddLeWare, (req, res) => {
  res.send("This is the profile route");
});

app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', employeeRoutes);
app.use('/api',aurthRoutes);

app.get("/check", verifyUser, (req, res) => {
  res.status(200).json("yes you are verified");
});
app.get("/checkHr", verifyHR, (req, res) => {
  res.status(200).json("yes you are verified as HR");
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
