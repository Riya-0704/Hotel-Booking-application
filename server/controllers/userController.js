const user = require("../models/User");

const bcrypt = require("bcrypt"); //for password hashing
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new user({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
      img: req.body.img,
      isAdmin: req.body.isAdmin,
    }); //create new user
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await user.findOne({ username: req.body.username });
    if (!user) {
      res.status(401).json("Wrong credentials!");
      return;
    }
    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!validated) {
      res.status(401).json("Wrong credentials!");
      return;
    }
    const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, process.env.JWT);

    const { password, isAdmin, ...others } = user._doc;
    res.status(200).json({...others, token});
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await user.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await user.findOne({ username: req.params.username });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await user.find({});
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await user.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await user.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  getUserById,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
};
