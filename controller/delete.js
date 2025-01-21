let pool = require("../db/pool.js");
async function removeFarmer(username, phone_number) {
  await pool.query(
    "DELETE FROM farmers WHERE username = $1 AND phone_number = $2;",
    [username, phone_number],
  );
}
removeFarmer("jack", 99999999);

async function removeBuyer(username, phone_number) {
  await pool.query(
    "DELETE FROM buyers WHERE username = $1 AND phone_number = $2;",
    [username, phone_number],
  );
}

async function removeCrop(crop) {
  await pool.query(
    "DELETE FROM crop WHERE crop_name = $1 ;",
    [crop],
  );
}
//FIX: fails to delete
async function removeBuyerOfCrop(crop_name) {
  let { rows } = await pool.query(
    "DELETE   FROM buyers JOIN buyer_crop ON buyers.id= buyer_crop.buyer_id JOIN crop ON buyer_crop.crop_id = crop.id   WHERE  crop.crop_name= $1 ;",
    [crop_name],
  );
  console.log(rows);
}
//TODO: removefarmerOfcrop
//TODO: removefarmerOfcrop
//TODO: removefarmerOfarea
//TODO: removeBuyerofarea
//
