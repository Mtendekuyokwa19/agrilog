const { Router } = require("express");
let router = Router();
let d3 = require("d3");
const {
  getnumberofbuyers,
  getnumberoffarmers,
  getnumberofcrops,
} = require("../controller/get");

router.get("/", (req, res) => {

      res.render("index", {
        numberOfCrops: 100,

        numberOfbuyers:89, 

        numberOfFarmers: 223,
      });
  // try {
  //   Promise.all([
  //     getnumberoffarmers(),
  //     getnumberofbuyers(),
  //     getnumberofcrops(),
  //   ]).then((values) => {
  //     res.render("index", {
  //       numberOfCrops: values[0],
  //
  //       numberOfbuyers: values[1],
  //
  //       numberOfFarmers: values[2],
  //     });
  //   });
  // } catch (error) {}
});

module.exports = {
  router,
};
