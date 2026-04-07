"use strict";

/**
 * Sample on how to use node-postgres in FunctionGraph.
 *
 * Note that a new client will be created and connected for each invocation of the function,
 * which may not be optimal for performance in a production environment.
 * For better performance, consider using a connection pool as shown in the "index_usepool.js" sample.
 *
 * For more information on using node-postgres, see the official documentation: https://node-postgres.com/
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
 *  -> Basic Settings -> Handler: "index.handler"
 *
 */

const { Client } = require('pg')


// The handler function is the main entry point for the FunctionGraph function.
exports.handler = async (event, context) => {

    const client = new Client({
        user: context.getUserData("PGUSER"),
        password: context.getUserData("PGPASSWORD"),
        host: context.getUserData("PGHOST"),
        port: context.getUserData("PGPORT"),
        database: context.getUserData("PGDATABASE"),
    });

    let result = [];

    try {
        await client.connect();

        const res = await client.query('SELECT * FROM public.netflix_shows');

        result = JSON.parse(JSON.stringify(res.rows));

    } catch (e) {
         console.error("Error with database:", e);
         throw new Error("Error with database",e);
    } finally {
        await client.end()
    }

    return JSON.stringify(result);
}
