/**
 * Sample on how to use connection pool of node-postgres in FunctionGraph.
 *
 * The initializer is used to create a connection pool,
 * and the handler is used to query data from the database.
 *
 * Note that the connection pool will be reused across multiple invocations of the function,
 * which can improve performance by reducing the overhead of establishing a new connection for each invocation.
 *
 * For more information on using node-postgres with connection pools,
 * see the official documentation: https://node-postgres.com/features/pooling
 *
 * Following environment variables are required for this sample:
 * - PGUSER: The username for the PostgreSQL database.
 * - PGPASSWORD: The password for the PostgreSQL database.
 * - PGHOST: The host address of the PostgreSQL database.
 * - PGPORT: The port number of the PostgreSQL database (default is 5432).
 * - PGDATABASE: The name of the PostgreSQL database to connect to (in this sample, it's "netflix").
 *
 * The sample queries data from a table named "netflix_shows" in the "netflix" database,
 * and returns the results as a JSON string.
 *
 * Make sure to replace the database connection details and table name with your actual values when testing the sample.
 *
 * The functiongraph configuration for this sample should specify:
 * Configuration
 *  -> Basic Settings -> Handler: "index_usepool.handler"
 *  -> Lifecycle -> Initialization: "enabled"
 *  -> Lifecycle -> Function initializer: "index_usepool.initializer".
 *
 */
const { Pool } = require("pg");

let pool;

exports.initializer = function (context, callback) {
  const logger = context.getLogger();

  logger.info("initializing database connection pool...");
  pool = new Pool({
    user: context.getUserData("PGUSER"),
    host: context.getUserData("PGHOST"),
    database: context.getUserData("PGDATABASE"),
    password: context.getUserData("PGPASSWORD"),
    port: context.getUserData("PGPORT"),
  });
  callback(null, "");
};

exports.handler = async (event, context) => {
  const logger = context.getLogger();

  let client;

  let result = [];

  try {
    const client = await pool.connect();

    const res = await client.query(
      "SELECT * FROM public.netflix_shows limit 2",
    );

    result = JSON.parse(JSON.stringify(res.rows));
  } catch (e) {
    logger.error("Error with database:", e);
    throw new Error("Error with database", e);
  } finally {
    if (client) {
      client.release();
    }
  }

  return JSON.stringify(result);
};

