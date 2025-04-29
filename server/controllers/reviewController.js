const Review = require('../models/Review');


//create review
const createReview = async (req, res, next) => {
    const newReview = new Review(req.body);
    try {
        const savedReview = await newReview.save();
        res.status(200).json(savedReview);
    } catch (err) {
        next(err);
    }
};

//update review     
const updateReview = async (req, res, next) => {
    try {
        const updatedReview = await Review.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedReview);
    } catch (err) {
        next(err);
    }
};

//delete review 
const deleteReview = async (req, res, next) => {
    try {
        await Review.findByIdAndDelete(req.params.id);
        res.status(200).json("Review has been deleted");
    } catch (err) {
        next(err);
    }
};

//get review by id          
const getReviewById = async (req, res, next) => {
    try {
        const review = await Review.findById(req.params.id);    
        res.status(200).json(review);
    } catch (err) {
        next(err);
    }
};

module.exports = { createReview, updateReview, deleteReview, getReviewById };