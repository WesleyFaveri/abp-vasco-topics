require('dotenv').config(); // this is important!
module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": "postgres",
    "dialectOptions": {
      "ssl": {
        "rejectUnauthorized": false
      }
    }
  },
  "test": {
    "username": "root",
    "password": "123456",
    "database": "node_satc",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "dialectOptions": {
      "ssl": {
        "rejectUnauthorized": false
      }
    }
  },
  "production": {
    "username": "root",
    "password": "123456",
    "database": "node_satc",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "dialectOptions": {
      "ssl": {
        "rejectUnauthorized": false
      }
    }
  }
}
