const express = require("express");
const {
  getAppointments,
  getAppointmentById,
  addAppointment,
  updateAppointment,
  deleteAppoinment,
} = require("../controllers/appointments");

const router = express.Router({ mergeParams: true }); // Preserve the req.params values from the parent router. If the parent and the child have conflicting param names, the child’s value take precedence.
// will be useful for nested routes /hospitals/:hospitalId/appointments/ ?

const { protect, authorize } = require("../middleware/auth");

router.route("/").get(protect, getAppointments).post(protect, authorize('admin', 'user'), addAppointment);
router.route("/:id").get(protect, getAppointmentById).put(protect, updateAppointment).delete(protect, authorize('admin', 'user'), deleteAppoinment);

module.exports = router;
