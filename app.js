require('dotenv').config();  // Load environment variables

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingsRouter = require("./routes/listing");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

// MongoDB connection
mongoose.connect(process.env.ATLASDB_URL , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log('Error connecting to MongoDB:', err));

// View Engine Setup
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware for Parsing and Method Override
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Add this to parse JSON payloads
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// const store = MongoStore.create({
//   mongoUrl: process.env.ATLASDB_URL || 'mongodb://localhost:27017/your-database',
//   crypto: {
//     secret: process.env.SECRET,
//   },
//   touchAfter: 24 * 3600, // default: false, update the `lastActiveAt` field on every operation
// });

const store = MongoStore.create({
  mongoUrl: process.env.ATLASDB_URL || 'mongodb://localhost:27017/wanderlust',
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600, // default: false, update the lastActiveAt field on every operation
});

// Session Configuration
const sessionOptions = {
  store,
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 1 Week Expiration
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

// Passport Initialization
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Global Variables for Flash Messages
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// Routes
app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter);

// Catch-All Route for Undefined Endpoints
app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

// Global Error Handler
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error", { message });
});

// Start Server
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});