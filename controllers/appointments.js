const Appointment = require("../models/Appointment");
const Hospital = require("../models/Hospital");

// @desc    Get all appointments
// @route   GET /api/v1/.../appointments
// @access  Private
exports.getAppointments = async (req, res, next) => {
  let query;

  let findParams = {};

  // if the method is being used in a nested url of /hospitals/:hospitalId/appointments
  if (req.params.hospitalId) {
    findParams.hospital = req.params.hospitalId;
  }

  // general users can see only their appointments
  if (req.user.role !== "admin") {
    findParams.user = req.user.id;
  }

  // we'll add more fields to the hospital field, turning the query document into a nested object
  query = Appointment.find(findParams).populate({
    path: "hospital",
    select: "name province tel",
  });

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

// @desc    Get an appointment based on its id
// @route   GET /api/v1/appointments/:id
// @access  Private
exports.getAppointmentById = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate({
      path: "hospital",
      select: "name description tel",
    });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: `No appointment with the id of ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    console.log(error.stack);
    return res
      .status(500)
      .json({ success: false, message: "Cannot find Appointment" });
  }
};

// @desc    Add appointment
// @route   POST /api/v1/hospitals/:hospitalId/appointment
// @access  Private
exports.addAppointment = async (req, res, next) => {
  try {
    // we require that the handler is used at the specified route
    // and not POST /api/v1/appointment (will be 404)

    // add the params into the payload
    req.body.hospital = req.params.hospitalId;

    const hospital = await Hospital.findById(req.params.hospitalId);

    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: `No hospital with the id of ${req.params.hospitalId}`,
      });
    }

    const appointment = await Appointment.create(req.body); // pass the payload into the model
    res.status(200).json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Cannot create Appointment" });
  }
};
