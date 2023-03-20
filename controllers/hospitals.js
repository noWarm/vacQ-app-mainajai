const Hospital = require("../models/Hospital");
const VacCenter = require("../models/VacCenter");

exports.getAllHospital = async (req, res, next) => {
  // exclude the select and sort from the queryStr first
  const reqQuery = { ...req.query };
  const removeFields = ["select", "sort", "page", "limit"];
  removeFields.forEach((param) => delete reqQuery[param]);
  console.log(reqQuery);

  // once select and sort is removed, process the regular expressions
  let queryStr = JSON.stringify(req.query); // queryStr is now a JSON string, but why ?
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  // define the query to be executed
  let query;
  query = Hospital.find(JSON.parse(queryStr)).populate("appointments"); // the query is not executed yet !?
  // FIXME: why Stringfy then parse wa ?? wtf?

  // post-processing with select and sort
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }
  // sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }
  // set up pagination params
  const page = parseInt(req.query.page, 10) || 1; // specify the page number, otherwise first page
  const limit = parseInt(req.query.limit, 10) || 25; // specify page size
  const startIndex = (page - 1) * limit; // starting index
  const endIndex = page * limit;

  try {
    const total = await Hospital.countDocuments();
    query = query.skip(startIndex).limit(limit);

    const hospitals = await query; // execute the query here
    console.log(req.query);

    // handle pagination
    // note that this part will not be used for our back end, but should be sent to the front end
    // so that once a NEXT and PREV button in front end is implemented
    // it could derive the value of the next and previous page
    // and in turn updates the query parameter by itself

    const pagination = {};

    if (endIndex < total) {
      pagination.next = { page: page + 1, limit };
    }

    if (startIndex > 0) {
      pagination.prev = { page: page - 1, limit };
    }

    res
      .status(200)
      .json({ success: true, count: hospitals.length, data: hospitals });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

exports.getHospital = async (req, res, next) => {
  console.log(req.params);
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: hospital });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

exports.createHospital = async (req, res, next) => {
  console.log(req.body);

  const hospital = await Hospital.create(req.body);

  res.status(200).json({ success: true, data: hospital });
};

exports.updateHospital = async (req, res, next) => {
  try {
    const hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!hospital) {
      console.log("no hospital with such ID");
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: hospital });
  } catch (err) {
    console.log(`catch: ${err}`);
    res.status(400).json({ success: false });
  }
};

exports.deleteHospital = async (req, res, next) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) {
      return res.status(400).json({ success: false });
    }
    console.log(hospital);
    hospital.remove();
    res.status(200).json({ success: true, data: hospital });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//@route GET /api/v1/hospitals/vacCenters/
exports.getVacCenters = (req, res, next) => {
  VacCenter.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occured while retrieving Vaccine Centers.",
      });
    } else {
      res.send(data);
    }
  });
};
