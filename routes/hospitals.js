const express = require("express");
const {
  getAllHospital,
  createHospital,
  getHospital,
  updateHospital,
  deleteHospital,
  getVacCenters,
} = require("../controllers/hospitals");
const { protect, authorize } = require("../middleware/auth");
const appointmentRouter = require("./appointments");
router = express.Router();


router
  .route("/")
  .get(getAllHospital)
  .post(protect, authorize("admin"), createHospital); //TODO: will this works? does it have to be ["admin"] instead

// must be before /:id, otherwise it will go to the /:id route with req.params.id = "vacCenters"
router.route("/vacCenters").get(getVacCenters);

router
  .route("/:id")
  .get(getHospital)
  .put(protect, authorize("admin"), updateHospital)
  .delete(protect, authorize("admin"), deleteHospital);

router.use("/:hospitalId/appointments", appointmentRouter); // the hospitalId params will be sent to the appointmentRouter because the option mergeParams:true


module.exports = router;
