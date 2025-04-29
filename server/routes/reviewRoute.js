const {Router} = require("express");
 const {
    createReview,
    updateReview,
     deleteReview,
     getReviewById,
     }  = require("../controllers/reviewController");

const router = Router();


 //create review    
 router.post('/', createReview);

 //update review
 router.put("/:id",updateReview);

 //delete review
 router.delete("/:id", deleteReview);

 //get review by id
 router.get("/:id", getReviewById);

module.exports = router;    