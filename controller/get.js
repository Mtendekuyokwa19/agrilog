const pool = require("../db/pool");

async function getallcrops() {
  let { rows } = await pool.query("SELECT crop_name FROM crop");
  return rows;
}
async function getallfarmers() {
  let { rows } = await pool.query("SELECT username  FROM farmers");
  console.log(rows);
  return rows;
}
async function getallbuyers() {
  let { rows } = await pool.query("SELECT username FROM buyers");
  return rows;
}

async function getFarmersforCrop(cropname) {
  let { rows } = await pool.query(
    "SELECT farmers.username ,crop_name FROM farmers JOIN farmer_crop ON farmers.id=farmer_id JOIN crop ON crop_of_interest_id=crop.id  WHERE $1 = crop.crop_name ",
    [cropname.toLowerCase()],
  );
  console.log(rows);
  return rows;
}
async function getCropforFarmers(farmerName) {
  let { rows } = await pool.query(
    "SELECT farmers.username ,crop_name FROM farmers JOIN farmer_crop ON farmers.id=farmer_id JOIN crop ON crop_of_interest_id=crop.id  WHERE $1 = farmer.username ",
    [farmerName.toLowerCase()],
  );
  return rows;
}
async function getfarmersinarea(areaName) {
  let { rows } = await pool.query(
    "SELECT farmers.username FROM farmers JOIN area_of_operation ON area_of_operation_id=farmers.area_of_operation_id  WHERE $1 = area_of_operation.area_name OR $1=area_of_operation.district   ",
    [areaName.toLowerCase()],
  );
  console.log(rows);
  return rows;
}

async function getcropsinarea(areaName) {
  let { rows } = await pool.query(
    "SELECT DISTINCT crop.crop_name FROM crop JOIN farmers ON farmers.crop_of_interest_id=crop.id JOIN area_of_operation ON area_of_operation_id=farmers.area_of_operation_id  WHERE $1 = area_of_operation.area_name OR $1=area_of_operation.district   ",
    [areaName.toLowerCase()],
  );
  console.log(rows);
  return rows;
}

async function getbuyersinarea(areaName) {
  let { rows } = await pool.query(
    "SELECT DISTINCT buyers.username FROM buyers JOIN area_of_operation ON buyers.area_of_operation_id=area_of_operation.id  WHERE $1 = area_of_operation.area_name OR $1=area_of_operation.district   ",
    [areaName.toLowerCase()],
  );
  console.log(rows);
  return rows;
}
//FIX: this returns the wrong data
async function getbuyerscrop(cropName) {
  let { rows } = await pool.query(
    "SELECT buyers.username ,crop_name FROM buyers JOIN buyer_crop ON buyers.id=buyer_crop.buyer_id JOIN crop ON crop.id=buyer_crop.crop_id  WHERE $1 = crop_name ",
    [cropName.toLowerCase()],
  );
  console.log(rows);
  return rows;
}
getbuyerscrop("maize");
