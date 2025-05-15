const express = require("express");
const router = express.Router();
const userRoutes = require("./user.routes");
const resepRoutes = require("./resep.routes");
const authRoutes = require("./auth.routes");
// endpoint user
router.use("/users", userRoutes);

// endpoint auth
router.use("/auth", authRoutes);
//endpoint resep
router.use("/reseps", resepRoutes);

module.exports = router;
