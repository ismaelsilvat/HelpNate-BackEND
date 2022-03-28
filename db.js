const Pool = require("pg").Pool;
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "HelpNate",
    password: "ismael123",
    port: 5432
})

module.exports = pool;