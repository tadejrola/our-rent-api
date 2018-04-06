// Update with your config settings.
//const config = require('./dbconfig.js');
var config = {

  HOST: process.env.HOST,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DATABASE: process.env.DATABASE
}

module.exports = {
  production: {
    client: 'mysql',
    connection: {
      host: config.HOST,
      user: config.USER,
      password: config.PASSWORD,
      database: config.DATABASE
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
