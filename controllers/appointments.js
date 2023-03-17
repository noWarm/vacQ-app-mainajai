const Appointment = require("../models/Appointment");

// @desc    Get all appointments
// @route   GET /api/v1/appointments
// @access  Private
exports.getAppointments = async (req, res, next) => {
  let query;

  // general users can see only their appointments
  if (req.user.role !== "admin") {
    query = Appointment.find({ user: req.user.id });
  } else {
    // if you are admin, you can see all
    query = Appointment.find();
  }

  try {
    const appointments = await query;

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    console.log(error.stack);
    return res
      .status(500)
      .json({ success: false, message: "Cannot find Appointment" });
  }
};
