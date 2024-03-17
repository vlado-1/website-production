// Have Init function (add to main.ts) to create mysql db pool (connection pool). 
// Have execute function to execute queries
//  Helpfule link: https://www.becomebetterprogrammer.com/mysql-nodejs-expressjs-typescript/
var dataSource = require ('./../config/db.config').DATA_SOURCES.mySqlDataSource;
var db = require('mysql');
var pool = db.pool;

/**
 * generates pool connection to be used throughout the app
 */
const init = () => {
  try {
    pool = db.createPool({
      connectionLimit: dataSource.DB_CONNECTION_LIMIT,
      host: dataSource.DB_HOST,
      user: dataSource.DB_USER,
      password: dataSource.DB_PASSWORD,
      database: dataSource.DB_DATABASE,
    });

    console.debug('MySql Adapter Pool generated successfully');
  } catch (error) {
    console.error('[mysql.connector][init][Error]: ', error);
    throw new Error('failed to initialized pool');
  }
};

/**
 * executes SQL queries in MySQL db
 *
 * @param {string} query - provide a valid SQL query
 * @param {string[] | Object} params - provide the parameterized values used
 * in the query
 */
const execute = (query: any, params: any) => {
  try {
    if (!pool) throw new Error('Pool was not created. Ensure pool is created when running the app.');
    return new Promise((resolve, reject) => {
      pool.query(query, params, (error: any, results: any) => {
        if (error) {
          reject(error);
        }
        else {
          resolve(results)};
      });
    });

  } catch (error) {
    console.error('[mysql.connector][execute][Error]: ', error);
    throw new Error('failed to execute MySQL query');
  }
}

module.exports = {init, execute};