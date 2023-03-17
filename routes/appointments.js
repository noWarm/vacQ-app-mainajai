const express = require("express");
const {
  getAppointments,
  getAppointmentById,
  addAppointment,
} = require("../controllers/appointments");

const router = express.Router({ mergeParams: true }); // Preserve the req.params values from the parent router. If the parent and the child have conflicting param names, the child’s value take precedence.
// will be useful for nested routes /hospitals/:hospitalId/appointments/ ?

const { protect } = require("../middleware/auth");

router.route("/").get(protect, getAppointments).post(protect, addAppointment);
router.route("/:id").get(protect, getAppointmentById);

module.exports = router;
