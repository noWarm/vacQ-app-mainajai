const express = require("express");
const {
  getAllHospital,
  createHospital,
  getHospital,
  updateHospital,
  deleteHospital,
} = require("../controllers/hospitals");
const { protect, authorize } = require("../middleware/auth");
router = express.Router();

router
  .route("/")
  .get(getAllHospital)
  .post(protect, authorize("admin"), createHospital);   //TODO: will this works? does it have to be ["admin"] instead
  // TODO: what's with authorize(...roles) syntax ? 
router
  .route("/:id")
  .get(getHospital)
  .put(protect, authorize("admin"), updateHospital)
  .delete(protect, authorize("admin"), deleteHospital);

module.exports = router;
