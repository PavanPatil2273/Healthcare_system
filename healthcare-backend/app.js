var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors"); // 1. Import CORS
var mongoose = require("mongoose"); // 2. Import Mongoose

// 3. Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/healthcare")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("DB Error:", err));

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var appointmentRouter = require("./routes/appointments"); // 4. Import new route

var app = express();

app.use(cors()); // 5. Use CORS
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/health", (req, res) => {
  res.status(201).json({ message: "ok" });
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/appointments", appointmentRouter); // 6. Use new route

app.listen(3000, () => {
  console.log("Serve running on port 3000");
});

module.exports = app;
