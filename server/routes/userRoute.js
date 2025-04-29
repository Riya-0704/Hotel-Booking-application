const { Router } = require("express");
const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("../middleware/jwtTokens");
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
} = require("../controllers/userController");

const router = Router();

//get all users
router.get("/", verifyTokenAndAdmin, getUsers);
// router.get('/', getUsers);

//create user
router.post("/", verifyTokenAndAdmin, createUser);
// router.post('/', createUser);

//update user
router.put("/:id", verifyTokenAndAuthorization, updateUser);
// router.put("/:id",updateUser);

//delete user
router.delete("/:id", verifyTokenAndAuthorization, deleteUser);
//router.delete("/:id", deleteUser);

//get user by id
router.get("/:id", verifyTokenAndAuthorization, getUserById);
//router.get("/:id", getUserById);

module.exports = router;
