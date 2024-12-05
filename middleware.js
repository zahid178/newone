


// const Listing = require("./models/listing");
// const Review = require("./models/review");
// const ExpressError = require('./utils/ExpressError');
// const { listingSchema, reviewSchema } = require("./schema.js");

// module.exports.isLoggedIn = (req, res, next) => {
//     if (!req.isAuthenticated()) {
//         req.session.redirectUrl = req.originalUrl;
//         req.flash("error", "You must be logged in to create a listing!");
//         return res.redirect("/login");
//     }
//     next();
// };

// module.exports.saveRedirectUrl = (req, res, next) => {
//     if (req.session.redirectUrl) {
//         res.locals.redirectUrl = req.session.redirectUrl;
//     }
//     next();
// };

// module.exports.isOwner = async (req, res, next) => {
//     const { id } = req.params;
//     const listing = await Listing.findById(id);
//     if (!listing) {
//         req.flash("error", "Listing not found");
//         return res.redirect("/listings");
//     }
//     if (!listing.owner.equals(res.locals.currUser._id)) {
//         req.flash("error", "You are not the owner of this listing");
//         return res.redirect(`/listings/${id}`);
//     }
//     next();
// };



// module.exports.validateListing = (req, res, next) => {
//     // Type cast price to a number if it's a string
//     if (req.body.listing && typeof req.body.listing.price === "string") {
//       req.body.listing.price = Number(req.body.listing.price);
//     }
  
//     const { error } = listingSchema.validate(req.body);
//     if (error) {
//       const errMsg = error.details.map((el) => el.message).join(",");
//       throw new ExpressError(errMsg, 400);
//     }
//     next();
//   };
  

// module.exports.validateReview = (req, res, next) => {
//     const { error } = reviewSchema.validate(req.body);
//     if (error) {
//         const errMsg = error.details.map((el) => el.message).join(",");
//         throw new ExpressError(errMsg, 400);
//     } else {
//         next();
//     }
// };

// module.exports.isReviewAuthor = async (req, res, next) => {
//     const { id, reviewId } = req.params;
//     const review = await Review.findById(reviewId);
//     if (!review) {
//         req.flash("error", "Review not found");
//         return res.redirect(`/listings/${id}`);
//     }
//     if (!review.author.equals(res.locals.currUser._id)) {
//         req.flash("error", "You are not the author of this review");
//         return res.redirect(`/listings/${id}`);
//     }
//     next();
// };


const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError = require('./utils/ExpressError');
const { listingSchema, reviewSchema } = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to create a listing!");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }
    if (!listing.owner.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the owner of this listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
};



module.exports.validateListing = (req, res, next) => {
    // Type cast price to a number if it's a string
    if (req.body.listing && typeof req.body.listing.price === "string") {
      req.body.listing.price = Number(req.body.listing.price);
    }
  
    const { error } = listingSchema.validate(req.body);
    if (error) {
      const errMsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(errMsg, 400);
    }
    next();
  };
  

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(errMsg, 400);
    } else {
        next();
    }
};

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review) {
        req.flash("error", "Review not found");
        return res.redirect(`/listings/${id}`);
    }
    if (!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the author of this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
};