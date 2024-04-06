// Have Init function (add to main.ts) to create mysql db pool (connection pool). 
// Have execute function to execute queries
//  Helpfule link: https://www.becomebetterprogrammer.com/mysql-nodejs-expressjs-typescript/
// mysql2 can be import via import statement but mysql can't. mysql2 is newer.
import { DATA_SOURCES } from "../config/db.config";
import { createPool } from 'mysql2';
import { logger } from "../utils/project.logger";

var dataSource = DATA_SOURCES.mySqlDataSource;

var pool: any;

/**
 * generates pool connection to be used throughout the app
 */
const init = () => {
  try {
    logger.log('verbose',  new Date().toLocaleString() + ' | projectone.models.ts | init')
    pool = createPool({
      connectionLimit: dataSource.DB_CONNECTION_LIMIT,
      host: dataSource.DB_HOST,
      user: dataSource.DB_USER,
      password: dataSource.DB_PASSWORD,
      database: dataSource.DB_DATABASE,
    });
  } catch (error) {
    logger.log('verbose',  new Date().toLocaleString() + ' | projectone.models.ts | pool failed | ' + JSON.stringify(error));
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
    logger.log('verbose',  new Date().toLocaleString() + ' | projectone.models.ts | Execute');
    return new Promise((resolve, reject) => {
      pool.query(query, params, (error: any, results: any) => {
        if (error) {
          logger.log('verbose',  new Date().toLocaleString() + ' | projectone.models.ts | Execute failed | ' + JSON.stringify(error));
          reject(error);
        }
        else {
          logger.log('verbose',  new Date().toLocaleString() + ' | projectone.models.ts | Execute success');
          resolve(results)};
      });
    });

  } catch (error) {
    throw new Error('failed to execute MySQL query');
  }
}

export {init, execute};