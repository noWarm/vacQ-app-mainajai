const sql = require("../config/vacCenterDb");

// constructor
const VacCenter = ({ id, name, tel }) => {
  this.id = id;
  this.name = name;
  this.tel = tel;
};

// define a getAll method for the model
VacCenter.getAll = (result) => {
  sql.query("SELECT * FROM vacCenters", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("vacCenters: ", res);
    result(null, res);
  });
};

module.exports = VacCenter;