const Hospital = require("../models/Hospital");

exports.getAllHospital = async (req, res, next) => {
  // exclude the select and sort from the queryStr first
  const reqQuery = { ...req.query };
  const removeFields = ["select", "sort"];
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
  query = Hospital.find(JSON.parse(queryStr)); // the query is not executed yet !?
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
  
  try {
    const hospitals = await query; // execute the query here
    console.log(req.query);

    res
      .status(200)
      .json({ success: true, count: hospitals.length, data: hospitals });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

exports.getHospital = async (req, res, next) => {
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
    const hospital = await Hospital.findByIdAndDelete(req.params.id);
    if (!hospital) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
