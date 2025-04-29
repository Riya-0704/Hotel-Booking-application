const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT || 5080;
const connectDB = require("./config/db");
//const roomRoute = require("./routes/roomRoute");
const { errorHandler } = require("./middleware/errorHandler.js");

//connect tp database
connectDB();

// setup middlewares
app.use(express.json());
console.log(process.env.MONGO_URI);
//setup routes
app.use("/api/rooms", require("./routes/roomRoute.js"));
app.use("/api/users", require("./routes/userRoute.js"));
app.use("/api/reviews", require("./routes/reviewRoute.js"));
app.use("/api/hotels", require("./routes/hotelRoute.js"));

console.log("abcdefghijklmnopqrstuvwxyz".length);
//error handler
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

//app.use(errorHandler);

app.listen(port, () => console.log(`server is starting at port ${port}`));
