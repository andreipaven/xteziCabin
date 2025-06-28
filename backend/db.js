// const mysql = require("mysql2/promise");
//
// const pool = mysql.createPool({
//   host: process.env.DB_HOST || "",
//   user: process.env.DB_USER || "",
//   password: process.env.DB_PASSWORD || "",
//   database: process.env.DB_NAME || "",
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });
//
// module.exports = pool;

// render db
// const dbClient = new Client({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   port: process.env.DB_PORT,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

//supabase connection
const { Client } = require("pg");
require("dotenv").config();

const dbClient = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

module.exports = dbClient;
