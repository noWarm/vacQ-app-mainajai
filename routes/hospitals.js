const express = require('express');
const { getAllHospital, createHospital, getHospital, updateHospital, deleteHospital } = require('../controllers/hospitals');
const { protect } = require('../middleware/auth');
router = express.Router();

router.route('/').get(getAllHospital).post(protect, createHospital);
router.route('/:id').get(getHospital).put(protect, updateHospital).delete(protect, deleteHospital);

module.exports=router;