const { Router } = require("express");

const { addCrop, addAreaOfOperation } = require("../controller/insert");
const { body, validationResult } = require("express-validator");
let router = Router();
let d3 = require("d3");
const {
  getnumberofbuyers,
  getnumberoffarmers,
  getnumberofcrops,
  getallcrops,
  getallfarmersFortable,
  getpassword,
  getcroplist,
  getcropidbyname,
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
        numberOfCrops: values[2],

        numberOfbuyers: values[1],

        numberOfFarmers: values[0],
        allcrops: values[3],
        allfarmers: values[4],
      });
    });
  } catch (error) {
    console.error("failed to get");
  }
});
router.get("/newcrop", (req, res) => {
  res.render("newcrop", { error: "" });
});

router.get("/newfarmer", (req, res) => {
  try {
    Promise.all([
      getcroplist()



    ]).then(() => {


      res.render("newfarmer", { croplist: value[0] });


    })


  }
  catch (error) {
    console.log(error)

  }
});
router.post("/newfarmer", (req, res) => {
  Promise.all([
    getcropidbyname(req.body.crop_name),

    addAreaOfOperation(req.body.area_name, "global")
  ])
    .then((value) => {

    }).then(() => {


    })




})
router.post("/newcrop", (req, res) => {
  console.log(req);
  getpassword().then((value) => {
    if (value[0].password === req.body.password) {

      addCrop(req.body.crop_name, req.body.image_link)

      //res.render("newcrop", { error: "" })

      res.redirect("/");
      return
    }
    res.render("newcrop", { error: "wrong password" })
  })
});
module.exports = {
  router,
};
