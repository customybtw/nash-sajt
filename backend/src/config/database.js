const mysql = require('mysql2/promise');
const config = require('./env');

let pool;

async function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: config.db.host,
      port: config.db.port,
      user: config.db.user,
      password: config.db.password,
      database: config.db.database,
      waitForConnections: true,
      connectionLimit: 10,
      namedPlaceholders: true,
    });
  }
  return pool;
}

async function query(sql, params = {}) {
  const connection = await (await getPool()).getConnection();
  try {
    const [rows] = await connection.execute(sql, params);
    return rows;
  } finally {
    connection.release();
  }
}

module.exports = {
  getPool,
  query,
};
