const { Router } = require("express");
const { verifyTokens } = require("../middleware/jwtTokens");


const {
  getHotels,
  createHotel,
  updateHotel,
  deleteHotel,
  getHotelById,
  getHotelRoom,
  list,
  countByType,
} = require("../controllers/hotelController");

const router = Router();

//get all hotels
router.get("/", verifyTokens, getHotels);


//create hotel
router.post("/", verifyTokens, createHotel);

//update hotel
router.put("/:id", verifyTokens, updateHotel);


//delete hotel
router.delete("/:id", verifyTokens, deleteHotel);


//get hotel by id
router.get("/:id", getHotelById);

//get hotel rooms
router.get("/:id/rooms", getHotelRoom);

//get hotel number by type
router.get("/countByCity", countByType);

//get hotel number by city

//get hotels by city
router.get("/list", list);

module.exports = router;
