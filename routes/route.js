const { Router } = require("express");
let router = Router();
let d3 = require("d3");
const {
  getnumberofbuyers,
  getnumberoffarmers,
  getnumberofcrops,
  getallcrops,
  getallfarmersFortable,
} = require("../controller/get");

router.get("/", (req, res) => {
  try {
    Promise.all([
      getnumberoffarmers(),
      getnumberofbuyers(),
      getnumberofcrops(),
      getallcrops(),
      getallfarmersFortable(),
    ]).then((values) => {
      res.render("index", {
        numberOfCrops: values[0],

        numberOfbuyers: values[1],

        numberOfFarmers: values[2],
        allcrops: values[3],
        allfarmers: values[4],
      });
    });
  } catch (error) {
    console.error("failed to get");
  }
});

module.exports = {
  router,
};
