const { Router } = require("express");

const { addCrop, addAreaOfOperation, addFarmerWithid, farmer_crop } = require("../controller/insert");
const { body, validationResult } = require("express-validator");
let router = Router();
let d3 = require("d3");
const {
  getnumberofbuyers, getcropbyname,
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
const { changeFarmerdetails, updateCropDetail } = require("../controller/update");

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
        removefarmer: removefarmer
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
  Promise.all([
    getFarmerbyusername(req.params.username),

    getallcrops(),
    getallplaces()

  ])
    .then((value) => {

      res.render("updatefarmer.ejs", { arealist: value[2], error: "", farmer_details: value[0][0], croplist: value[1] })


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
router.post("/farmer/:username", (req, res) => {
  getpassword().then((password) => {
    if (password[0].password == req.body.password) {

      Promise.all([
        getcropidbyname(req.body.crop_name),

        getareaidbyname(req.body.area_name),


      ])
        .then((value) => {

          changeFarmerdetails(req.body.username, (value[0][0].id), parseInt(req.body.phone_number), value[1][0].id, req.body.farmer_id).then(() => {



          })

        }).finally(() => {


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

router.post("/cropup/:crop_name", (req, res) => {

  getpassword().then((value) => {
    if (value[0].password === req.body.password) {

      updateCropDetail(req.body.crop_name, req.body.image_link, req.body.crop_id)


      res.redirect("/");
      return
    }
    res.render("updatecrop", { error: "wrong password" })
  })
});
router.get("/cropup/:crop_name", (req, res) => {

  getcropbyname(req.params.crop_name).then((value) => {
    res.render("updatecrop", { error: "", crop: value[0] })
  })
});
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
