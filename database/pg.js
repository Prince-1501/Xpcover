const  { Pool } = require('pg');

require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production' ? true : false;
const connectionString = `postgres://${process.env.PG_DB_USER}:${process.env.PG_DB_PASSWORD}@${process.env.pG_DB_HOST}:${process.env.PG_DB_PORT}/${process.env.PG_DB_DATABASE}`;

exports.pool = new Pool({
    connectionString: isProduction ? connectionString : process.env.PG_DB_URL_TEST
})
