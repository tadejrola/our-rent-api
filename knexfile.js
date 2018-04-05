// Update with your config settings.
//const config = require('./dbconfig.js');
var config = {
  HOST: '65.19.141.67',
  USER: 'admintr_admintr',
  PASSWORD: 'admintr',
  DATABASE: 'admintr_OurRent'
}

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
    useNullAsDefault: true
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

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
