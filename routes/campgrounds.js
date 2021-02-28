const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const campgrounds = require('../controllers/campgrounds');
const multer = require('multer');
const { storage, cloudinary } = require('../cloudinary');// no need to include index.js (node automatically looks for index)
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware');

//const upload = multer({ dest: 'uploads/' });// storing images locally
const upload = multer({ storage });


router.route('/')
    // index route
    .get(catchAsync(campgrounds.index))
    // create route
    // .post(isLoggedIn, validateCampground, upload.array("image"), catchAsync(campgrounds.createCampground));
    .post(isLoggedIn, upload.array("image"), validateCampground, catchAsync(campgrounds.createCampground));


// new route
router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
    // show route
    .get(catchAsync(campgrounds.showCampground))
    // post route linked to the update form
    .put(isLoggedIn, isAuthor, upload.array("image"), validateCampground, catchAsync(campgrounds.editCampground))
    // Delete route ( following the restful path)
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

// update route (form):
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));




module.exports = router;