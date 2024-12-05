const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");

// Post review route

const reviewController = require("../controllers/reviews.js");

// router.post("/", isLoggedIn, validateReview, wrapAsync(async (req, res) => {
//   try {
//     let listing = await Listing.findById(req.params.id);
//     let newReview = new Review(req.body.review);
//     newReview.author = req.user._id;

//     listing.reviews.push(newReview);
//     await newReview.save();
//     await listing.save();
//     req.flash("success", "New review created!");  // This sets a success message
//     res.redirect(`/listings/${listing._id}`);
//   } catch (error) {
//     req.flash("error", "Something went wrong, try again.");  // Handle errors and set error message
//     res.redirect("back");
//   }
// }));

router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

// Delete review route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;