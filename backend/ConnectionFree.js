require('dotenv').config()

const { Pool } = require('pg')
const named = require('node-postgres-named')
const pool = new Pool({
  connectionString: `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
})

const queryLivre = async (query, params = {}) => {
  return new Promise(async (resolve, reject) => {
    named.patch(pool)
    await pool.query(query, params, (error, results) => {
      if (error) {
        reject(error)
      } else {
        if (results.rows.length == 0) {
          resolve(null)
        } else {
          resolve(results.rows)
        }
      }
    })
  })
}

module.exports = queryLivre
