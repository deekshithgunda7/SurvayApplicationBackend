const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.PSQL_DB,
  password: process.env.DB_PASS,
  port: 5432,
});
/*pool.on("connect",()=>{
    console.log("connected to database")
})*/
module.exports = pool;
