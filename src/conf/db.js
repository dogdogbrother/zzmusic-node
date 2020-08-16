const { isProd } = require('../utils/env')

const REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1'
}

let MYSQL_CONF = {
  host: 'localhost',
  user: 'root',
  password: '',
  port: '3306',
  database: 'zzmusic'
}

if (isProd) {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'Mysql_2018',
    port: '3306',
    database: 'zzmusic'
  }
}
module.exports = {
  REDIS_CONF,
  MYSQL_CONF
}