const { Router } = require("express");

const { addCrop, addAreaOfOperation, addFarmerWithid, farmer_crop } = require("../controller/insert");
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
  getareaidbyname,
  getallplaces,
  getFarmersforCrop,
  getfarmerid,
  getFarmerbyusername,
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

      , getallplaces()

    ]).then((value) => {


      res.render("newfarmer", { croplist: value[0], error: "", arealist: value[1] });


    })


  }
  catch (error) {
    console.log(error)

  }
});
router.get("/crop/:crop", (req, res) => {

  getFarmersforCrop(req.params.crop).then((farmerlist) => {

    console.log(req.params.crop.toString())
    res.render("specificcrop.ejs", { allfarmers: farmerlist })


  })

})

router.get("/farmer/:username", (req, res) => {

  getFarmerbyusername(req.params.username).then((farmer_details) => {

    console.log(farmer_details)
    res.render("updatefarmer.ejs", { farmer_details: farmer_details })


  })

})
router.post("/newfarmer", (req, res) => {
  getpassword().then((password) => {
    if (password[0].password == req.body.password) {


      Promise.all([
        getcropidbyname(req.body.crop_name),

        getareaidbyname(req.body.area_name)

      ])
        .then((value) => {
          addFarmerWithid(req.body.username, (value[0][0].id), parseInt(req.body.phone_number), (value[1][0].id)).then(() => {
            getfarmerid(req.body.username).then((id) => {

              console.log(id)

              farmer_crop(value[0][0].id, id[0].id)
            })

          })
          res.redirect("/")
        })

    }
    else {

      getcroplist().then((value) => {


        res.render("newfarmer", { croplist: value, error: "wrong password" })

      })

    }

  })








})
router.post("/newcrop", (req, res) => {
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
