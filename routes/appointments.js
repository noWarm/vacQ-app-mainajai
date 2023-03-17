const express = require("express");
const { getAppointments } = require("../controllers/appointments");

const router = express.Router({ mergeParams: true }); // Preserve the req.params values from the parent router. If the parent and the child have conflicting param names, the child’s value take precedence.

const { protect } = require("../middleware/auth");

router.route("/").get(protect, getAppointments);

module.exports = router;
