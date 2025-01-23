const pool = require("./pool.js");

async function farmerTable() {
  let sql = `

CREATE TABLE IF NOT EXISTS farmers (id INTEGER PRIMARY KEY
GENERATED ALWAYS AS IDENTITY,
username VARCHAR(255),

crop_of_interest_id INTEGER,

phone_number INTEGER,
area_of_operation_id INTEGER
);
    `;
  await pool.query(sql);
  console.log("here");
}
async function area_of_operation() {
  let sql = `

CREATE TABLE IF NOT EXISTS area_of_operation (id INTEGER PRIMARY KEY
GENERATED ALWAYS AS IDENTITY,
district VARCHAR(255),

area_name VARCHAR(255)

);
    `;
  await pool.query(sql);
  console.log("here");
}
async function crop() {
  let sql = `

CREATE TABLE IF NOT EXISTS crop (id INTEGER PRIMARY KEY
GENERATED ALWAYS AS IDENTITY,
crop_name VARCHAR(255)


);
    `;
  await pool.query(sql);
  console.log("here");
}
crop();
async function buyer_crop_table() {
  let sql = `

CREATE TABLE IF NOT EXISTS buyer_crop (crop_id 
INTEGER,
buyer_id INTEGER

);
    `;
  await pool.query(sql);
  console.log("here");
}
farmer_crop_table();
async function farmer_crop_table() {
  let sql = `

CREATE TABLE IF NOT EXISTS farmer_crop (crop_id 
INTEGER,
farmer_id INTEGER

);
    `;
  await pool.query(sql);
  console.log("here");
}
async function buyerTables() {
  let sql = `

CREATE TABLE IF NOT EXISTS buyers (id INTEGER PRIMARY KEY
GENERATED ALWAYS AS IDENTITY,
username VARCHAR(255),

crop_of_interest_id INTEGER,

phone_number INTEGER,
area_of_operation_id INTEGER
);
    `;
  await pool.query(sql);
  console.log("here");
}

async function AIconv() {
  let sql = `

CREATE TABLE IF NOT EXISTS ai_conversation (id INTEGER PRIMARY KEY
GENERATED ALWAYS AS IDENTITY,
usermessage VARCHAR(255),

ai_response VARCHAR(255)


);
    `;
  await pool.query(sql);
}
