const { isProd } = require('../utils/env')

const REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1'
}

let MYSQL_CONF = {
  user: 'root',
  password: 'Mysql_123456',
  port: '3306',
  database: 'mysql'
}

if (isProd) {
  MYSQL_CONF = {
    user: 'root',
    password: 'Mysql_123456',
    port: '3306',
    database: 'mysql'
  }
}
module.exports = {
  REDIS_CONF,
  MYSQL_CONF
}