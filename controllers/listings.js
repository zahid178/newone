// const Listing = require('../models/listing')

// module.exports.index = async (req, res) => {
//   try {
//     const allListings = await Listing.find({});
//     res.render("listings/index", { allListings });
//   } catch (error) {
//     req.flash("error", "Unable to retrieve listings.");
//     res.redirect("/listings");
//   }
// };

// module.exports.renderNewForm = (req, res) => {
//   res.render("listings/new.ejs");
// };

// module.exports.showListing = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const listing = await Listing.findById(id)
//       .populate({
//         path: "reviews",
//         populate: { path: "author" },
//       })
//       .populate("owner");

//     if (!listing) {
//       req.flash("error", "Listing you requested for does not exist!");
//       return res.redirect("/listings");
//     }

//     res.render("listings/show.ejs", { listing });
//   } catch (error) {
//     // req.flash("error", "Error retrieving listing details");
//     req.flash("success", "Listing Updated");
//     res.redirect("/listings");
//   }
// };



// module.exports.createListing = async (req, res, next) => { 
//   let url = req.file.path;
//   let filename = req.file.filename;
//   let newListing = new Listing(req.body.listing); 
//   newListing.owner = req.user._id;
//   newListing.image = {url, filename}; 
//   await newListing.save();    
//   req.flash("success", "new listing created!");
//   res.redirect('/listings');
// }


// // module.exports.renderEditForm = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const listing = await Listing.findById(id);

// //     if (!listing) {
// //       req.flash("error", "Listing you requested for does not exist!");
// //       return res.redirect("/listings");
// //     }

// //     res.render("listings/edit.ejs", { listing });
// //   } catch (error) {
// //     req.flash("error", "Error retrieving listing for editing.");
// //     res.redirect("/listings");
// //   }
// // };

// module.exports.renderEditForm = async (req, res) => {
//    let  { id } = req.params;
//    const listing = await Listing.findById(id);
//    if (!listing) {
//     req.flash("error", "Listing you requested for does not exist!");
//     res.redirect("/listings");
//   }
//   let originalImageUrl = listing.image.url;
//   originalImageUrl.replace("/upload", "/upload/h_300,w_250");
//   res.render("listings/edit.ejs", { listing , originalImageUrl});
// };



// // module.exports.updateListing = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     if (!req.body.listing) {
// //       req.flash("error", "Listing data is required.");
// //       return res.redirect(`/listings/${id}/edit`);
// //     }

// //     await Listing.findByIdAndUpdate(id, { ...req.body.listing });
// //     req.flash("success", "Listing Updated!");
// //     res.redirect(`/listings/${id}`);
// //   } catch (error) {
// //     req.flash("error", "Error updating listing.");
// //     res.redirect(`/listings/${id}/edit`);
// //   }
// // };

// module.exports.updateListing = async (req, res) => {
//   let {id} = req.params;
//   let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

//   if (typeof req.file !== "undefined") {
//     let url = req.file.path;
//     let filename = req.file.filename;
//     listing.image = {url, filename};
//     await listing.save();
//   }
 
//   req.flash("success", "Listing Updated!");
//   res.redirect(`/listings/{id}`);
// };

// module.exports.destroyListing = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Listing.findByIdAndDelete(id);
//     req.flash("success", "Listing Deleted");
//     res.redirect("/listings");
//   } catch (error) {
//     req.flash("error", "Error deleting listing.");
//     res.redirect("/listings");
//   }
// };

const Listing = require('../models/listing')

module.exports.index = async (req, res) => {
  try {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
  } catch (error) {
    req.flash("error", "Unable to retrieve listings.");
    res.redirect("/listings");
  }
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id)
      .populate({
        path: "reviews",
        populate: { path: "author" },
      })
      .populate("owner");

    if (!listing) {
      req.flash("error", "Listing you requested for does not exist!");
      return res.redirect("/listings");
    }

    res.render("listings/show.ejs", { listing });
  } catch (error) {
    // req.flash("error", "Error retrieving listing details");
    req.flash("success", "Listing Updated");
    res.redirect("/listings");
  }
};



module.exports.createListing = async (req, res, next) => { 
  let url = req.file.path;
  let filename = req.file.filename;
  let newListing = new Listing(req.body.listing); 
  newListing.owner = req.user._id;
  newListing.image = {url, filename}; 
  await newListing.save();    
  req.flash("success", "new listing created!");
  res.redirect('/listings');
}


// module.exports.renderEditForm = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const listing = await Listing.findById(id);

//     if (!listing) {
//       req.flash("error", "Listing you requested for does not exist!");
//       return res.redirect("/listings");
//     }

//     res.render("listings/edit.ejs", { listing });
//   } catch (error) {
//     req.flash("error", "Error retrieving listing for editing.");
//     res.redirect("/listings");
//   }
// };

module.exports.renderEditForm = async (req, res) => {
   let  { id } = req.params;
   const listing = await Listing.findById(id);
   if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    res.redirect("/listings");
  }
  let originalImageUrl = listing.image.url;
  originalImageUrl.replace("/upload", "/upload/h_300,w_250");
  res.render("listings/edit.ejs", { listing , originalImageUrl});
};



// module.exports.updateListing = async (req, res) => {
//   try {
//     const { id } = req.params;
//     if (!req.body.listing) {
//       req.flash("error", "Listing data is required.");
//       return res.redirect(`/listings/${id}/edit`);
//     }

//     await Listing.findByIdAndUpdate(id, { ...req.body.listing });
//     req.flash("success", "Listing Updated!");
//     res.redirect(`/listings/${id}`);
//   } catch (error) {
//     req.flash("error", "Error updating listing.");
//     res.redirect(`/listings/${id}/edit`);
//   }
// };

module.exports.updateListing = async (req, res) => {
  let {id} = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url, filename};
    await listing.save();
  }
 
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/{id}`);
};

module.exports.destroyListing = async (req, res) => {
  try {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");
  } catch (error) {
    req.flash("error", "Error deleting listing.");
    res.redirect("/listings");
  }
};