const mongoose = require("mongoose");

const HospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      unique: true,
      trim: true,
      maxlength: [50, "Name can not be more than 50 characters"],
    },
    address: {
      type: String,
      required: [true, "Please add an address"],
    },
    district: {
      type: String,
      required: [true, "Please add a district"],
    },
    province: {
      type: String,
      required: [true, "Please add a province"],
    },
    postalcode: {
      type: String,
      required: [true, "Please add a postalcode"],
      maxlength: [5, "Postal code can not be more than 5 characters"],
    },
    tel: {
      type: String,
    },
    region: {
      type: String,
      required: [true, "Please add a region"],
    },
  },
  {
    toJSON: { virtuals: true }, // note that virtuals will generate an "id" field that refers to "_id" field
    toObject: { virtuals: true },
  }
);

// we'll virtually populate the Hospital model with a field called appointments
// it is not stored in the database (Hospital records size are the same)
HospitalSchema.virtual("appointments", {
  ref: "Appointment",
  localField: "_id", // one-end:Hospital._id
  foreignField: "hospital", // the-other-end:must match Appointment.hospital
  justOne: false,
});

module.exports = mongoose.model("Hospital", HospitalSchema);
