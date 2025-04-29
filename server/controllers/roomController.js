const Room = require("../models/Room.js");
const Hotel = require("../models/Hotels.js");

//get all rooms
/*const getRooms = async (req, res, next) => {
  try {
    const room = await Room.find();
    return res.status(200).json(room);
  } catch (err) {
    next(err);
    console.log(err);
  }
};*/
const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    if (!rooms.length) {
      return res.status(404).json({ message: "No rooms found" });
    }
    return res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};

//create room

const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  const newRoom = new Room(req.body);
  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(
        hotelId,
        { $push: { rooms: savedRoom._id } },
        { new: true }
      );
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
    console.log(err);
  }
};

//update room
const updateRoom = async (req, res, next) => {
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(room);
  } catch (err) {
    next(err);
    console.log(err);
  }
};

//delete room
const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(
        hotelId,
        { $pull: { rooms: req.params.id } },
        { new: true }
      );
    } catch (err) {
      next(err);
      console.log(err);
    }
    res.status(200).json("Room has been deleted");
  } catch (err) {
    next(err);
    console.log(err);
  }
};

// delete room from collection
const deletefromcollection = async (req, res, next) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.status(200).json("Room deleted from collection");
  } catch (err) {
    next(err);
    console.log(err);
  }
};

// GET A SINGLE DOCUMENT BY ID TO SEE ITS FIELDS
const getRoomFields = async (req, res, next) => {
  try {
    const roomId = req.params.roomId;
    const room = await Room.findById(roomId);
    res.status(200).json(room.fields);
    //console.log(getRoomFields);
  } catch (err) {
    next(err);
    console.log(err);
  }
};
//Delete rooms particular field from collection
const deleteField = async (req, res, next) => {
  const fieldToDelete = req.body.field;
  if (!fieldToDelete) {
    return res.status(400).json({ message: "Field to delete not provided." });
  }
  try {
    const result = await Room.updateMany(
      {},
      { $unset: { [fieldToDelete]: "" } }
    );
    res.status(200).json({
      message: `Field "${fieldToDelete}" has been deleted from all rooms`,
      result,
    });
  } catch (err) {
    next(err);
    console.log(err);
  }
};

//get room by room id
const getRoomById = async (req, res, next) => {
  try {
    const getRoomById = await Room.findById(req.params.id);
    res.status(200).json(getRoomById);
  } catch (err) {
    next(err);
    console.log(err);
  }
};

// book room with exact date with room id
const bookRoomByDate = async (req, res, next) => {
  const roomId = req.params.roomId;
  const bookingDates = req.body.dates;

  if (!bookingDates || !Array.isArray(bookingDates)) {
    return res
      .status(400)
      .json({ message: "Valid booking dates not provided." });
  }

  try {
    await Room.updateOne(
      { "roomNumbers._id": roomId },
      {
        $addToSet: {
          "roomNumbers.$.unavailableDates": { $each: bookingDates },
        },
      }
    );
    res.status(200).json("Room booking dates have been updated.");
  } catch (err) {
    next(err);
    console.log(err);
  }
};

module.exports = {
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom,
  deletefromcollection,
  getRoomById,
  deleteField,
  getRoomFields,
  bookRoomByDate,
};
