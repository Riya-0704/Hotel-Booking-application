const express = require("express");
const router = express.Router();
const { verifyTokens } = require("../middleware/jwtTokens.js");
const {
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom,
  deleteField,
  deletefromcollection,
  bookRoomByDate,
  getRoomById,
  getRoomFields,
} = require("../controllers/roomController.js");

// Routes
router.get("/rooms/:id", verifyTokens, getRooms);
router.post("/rooms", verifyTokens, createRoom);
router.put("/rooms/:id", verifyTokens, updateRoom);
router.delete("/rooms/:id", verifyTokens, deleteRoom);
router.delete("/rooms/delete/:id", verifyTokens, deletefromcollection);
router.get("/rooms/:id/details", verifyTokens, getRoomById);
router.patch("/rooms/delete/field", verifyTokens, deleteField);
router.get("/rooms/:id/fields", getRoomFields);
router.post("/rooms/:id/book", verifyTokens, bookRoomByDate);

module.exports = router;
