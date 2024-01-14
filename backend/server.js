const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const customerRouter = require("./routes/customerRouter")
const jobPositionRouter = require("./routes/jobPositionRouter")
const projectRouter = require("./routes/projectRouter")

const database = process.env.DATABASE_URL;
const port = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());

app.use(userRouter);
app.use(authRouter);
app.use(customerRouter);
app.use(jobPositionRouter)
app.use(projectRouter)

mongoose.connect(database).then(() => {
  console.log("Database Connect !!!");
});

app.listen(port, () => {
  console.log(`Run Server At Port ${port}`);
});