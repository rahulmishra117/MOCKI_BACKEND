const express = require("express");
const router = express.Router();
const passport = require("passport");

// require report controller
const reportRequests = require('../../../controllers/api/v1/reportsApi');

// get req for getting report of a specific status
router.get('/:status', passport.authenticate('jwt', {session: false}), reportRequests.statusReports);

module.exports = router;