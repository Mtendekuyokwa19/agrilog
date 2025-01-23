const { Pool } = require("pg");
require("dotenv").config();
<<<<<<< HEAD
=======

>>>>>>> b967119 (fetching the right data from db)
module.exports = new Pool({
  connectionString: process.env.DATABASE_URL,
});
