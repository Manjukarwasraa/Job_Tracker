const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Database connected");
}).catch((err) => console.log(err));


const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/jobs", require("./routes/jobRoutes"));

app.get("/api", (req, res) => {
  res.json({ message: "API is working" });
});

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT)
});
