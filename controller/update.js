
const pool = require("../db/pool.js");
async function changeFarmerdetails(
  username,
  crop_of_interest_id,
  phone_number,
  area_of_operation_id,

  farmerid,
) {
  await pool.query(
    "UPDATE  farmers SET username=$1,crop_of_interest_id=$2,phone_number=$3,area_of_operation_id=$4   WHERE farmers.id=$5;    ",
    [username, crop_of_interest_id, phone_number, area_of_operation_id, farmerid],
  );
}
async function updateCrop(newcrop, farmer_id) {
  await pool.query("UPDATE farmer_crop crop_id=$2 WHERE farmer_id=$1", [farmer_id, newcrop])

}

module.exports = {

  changeFarmerdetails,
  updateCrop

}
