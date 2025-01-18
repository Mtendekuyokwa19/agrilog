const pool = require("../db/pool.js");

async function addFarmerWithid(
  username,
  crop_of_interest_id,
  phone_number,
  area_of_operation_id,
) {
  await pool.query(
    "INSERT INTO farmers (username,crop_of_interest_id,phone_number,area_of_operation_id) VALUES ($1,$2,$3,$4);    ",
    [username, crop_of_interest_id, phone_number, area_of_operation_id],
  );
}
async function addBuyerWithid(
  username,
  crop_of_interest_id,
  phone_number,
  area_of_operation_id,
) {
  await pool.query(
    "INSERT INTO buyers (username,crop_of_interest_id,phone_number,area_of_operation_id) VALUES ($1,$2,$3,$4);    ",
    [username, crop_of_interest_id, phone_number, area_of_operation_id],
  );
}
async function addAreaOfOperation(district, area_name) {
  await pool.query(
    "INSERT INTO area_of_operation (district,area_name) VALUES ($1,$2);    ",
    [district, area_name],
  );
}
async function addCrop(cropname) {
  await pool.query(
    "INSERT INTO crop (crop_name) VALUES ($1);    ",
    [cropname],
  );
}

async function buyer_crop(crop_id, buyer_id) {
  await pool.query(
    "INSERT INTO crop (crop_id,buyer_id) VALUES ($1,$2);    ",
    [crop_id, buyer_id],
  );
}

async function farmer_crop(crop_id, farmer_id) {
  await pool.query(
    "INSERT INTO crop (crop_id,farmer_id) VALUES ($1,$2);    ",
    [crop_id, farmer_id],
  );
}
