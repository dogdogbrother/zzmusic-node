const { isProd } = require('../utils/env')

const REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1'
}

let MYSQL_CONF = {
  host: 'localhost',
  user: 'root',
  password: 'wojiaoWH.110',
  port: '3306',
  database: 'zzmusic',
  charset: 'utf8mb4'
}

if (isProd) {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'Mysql_123456',
    port: '3306',
    database: 'zzmusic',
    charset: 'utf8mb4'
  }
}
module.exports = {
  REDIS_CONF,
  MYSQL_CONF
}