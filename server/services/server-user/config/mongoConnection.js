if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const { MongoClient } = require("mongodb");

const connectionString = process.env.CONNECTIONSTRING

let db = null;

const mongoConnect = async () => {
    const client = new MongoClient(connectionString);

    try {
        const database = client.db("NewsPortalP3");

        db = database;

        return database;
    } catch (err) {
        await client.close();
    }
};

const getDatabase = () => db;

module.exports = {
    mongoConnect,
    getDatabase,
};
