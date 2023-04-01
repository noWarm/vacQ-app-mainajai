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

/**
 * Hospital Model.
 *
 * @swagger
 * components:
 *  schemas:
 *    Hospitals:
 *      type: object
 *      required:
 *      - name
 *      - address
 *      properties:
 *        id:
 *          type: string
 *          format: uuid
 *          description: The auto-generated id of the hospital
 *          example: d290f1ee-6c54-4b01-90e6-d701748f0851
 *        ลําดับ:
 *          type: string
 *          description: Ordinal number
 *        name:
 *          type: string
 *          description: Hospital name
 *        address:
 *          type: string
 *          description: House No., Street, Road
 *        district:
 *          type: string
 *          description: District
 *        province:
 *          type: string
 *          description: province
 *        postalcode:
 *          type: string
 *          description: 5-digit postal code
 *        tel:
 *          type: string
 *          description: telephone number
 *        region:
 *          type: string
 *          description: region
 *      example:
 *        id: 609bda561452242d88d36e37
 *        ลําดับ: 121
 *        name: Happy Hospital
 *        address: 121 ถ.สุขุมวิท
 *        district: บางนา
 *        province: กรุงเทพมหานคร
 *        postalcode: 10110
 *        tel: 02-2187000
 *        region: กรุงเทพมหานคร (Bangkok)
 */

/**
 * Hospital Tag
 *
 * @swagger
 * tags:
 *  name: Hospitals
 *  description: The hospitals managing AP
 */

/**
 * GET all hospitals.
 *
 * @swagger
 * /hospitals:
 *  get:
 *    summary: Returns the list of all the hospitals
 *    tags: [Hospitals]
 *    responses:
 *      200:
 *          description: The list of the hospitals
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Hospitals'
 */

/**
 * GET one hospital. (by ID.)
 *
 * @swagger
 * /hospitals/{id}:
 *  get:
 *    summary: Get the hospital by id
 *    tags: [Hospitals]
 *    parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: string
 *      required: true
 *      description: The hospital id
 *    responses:
 *      200:
 *        description: The hospital description by id
 *        contents:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Hospitals'
 *      404:
 *        description: The hospital wasn't found
 */

/**
 * @swagger
 * /hospitals:
 *  post:
 *    summary: Create a new hospital
 *    tags: [Hospitals]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Hospital'
 *    responses:
 *      201:
 *        description: The hospital was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Hospital'
 *      500:
 *        description: Some server error
 */

/**
 * PUT (Update) a hospital by ID.
 *
 * @swagger
 * /hospitals/{id}:
 *  put:
 *    summary: Update the hospital by id
 *    tags: [Hospitals]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description:  The hospital id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Hospitals'
 *    responses:
 *      200:
 *        description:  The hospital was updated.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Hospitals'
 *      404:
 *        description:  The hospital wasn't found.
 *      500:
 *        description:  Some error happened.
 */

/**
 * DELETE a hospital by ID.
 *
 * @swagger
 * /hospitals/{id}:
 *   delete:
 *     summary: Remove the hospital by id
 *     tags: [Hospitals]
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *       description: The hospital id
 *
 *     responses:
 *       200:
 *         description: The hospital was deleted
 *       404:
 *         description: The hospital wasn't found
 */
