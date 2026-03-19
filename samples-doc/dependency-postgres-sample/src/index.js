const { Client } = require('pg')

exports.initializer = function (context, callback) {
  callback(null, '');
}

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
