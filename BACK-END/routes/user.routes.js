const express = require("express");
const { registerUser } = require("../controllers/userController");
const router = express.Router();

// Register a new user
router.post("/", registerUser);

// // previlege admin ambil data all user
// router.get("/", protectedMiddleware, isAdmin, allUser);

// // get data user login atau tidak
// router.get("/me", protectedMiddleware, currentUser);

// // get user berdasarkan id
// router.get("/:id", protectedMiddleware, protectedUser, getUserById);

// // end points update password {oldPassword, newPassword}
// router.put(
//   "/:id/password",
//   protectedMiddleware,
//   protectedUser,
//   updatePasswordHandler
// ),
//   // end points delete user by id
//   router.delete(
//     "/:id",
//     protectedMiddleware,
//     protectedUser,
//     deleteUserByIdHandler
//   );

module.exports = router;
