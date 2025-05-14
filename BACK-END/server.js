const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");
const resepRoutes = require("./routes/resep.routes");
const usersRoutes = require("./routes/user.routes");
const { errorHandler, notFoundPath } = require("./middleware/errorMiddleware");
require("dotenv").config();

// host dan port
const host =
  process.env.NODE_ENV === "production" ? process.env.HOST : "api.localhost";
const port = process.env.NODE_ENV === "production" ? process.env.PORT : 3000;

// mengijinkan semua cors
app.use(cors());

// middleware parsing body request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookies
app.use(cookieParser());

app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/v1/users", usersRoutes);

//api resep
app.use("/v1/resep", resepRoutes);

// error path Not found
app.use(notFoundPath);
// error Handler
app.use(errorHandler);

// connect mongodb
async function start() {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("berhasil terhubung ke database..");
  } catch (error) {
    console.log(`gagal terhubung ke databse : ${error.message}`);
  }
}

app.listen(port, host, () => {
  console.log(`server running on http://${host}:${port}`);
});

module.exports = start;
