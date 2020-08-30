const seq = require('../db/seq')
const { STRING } = require('../db/types')

const User = seq.define('user', {
  id: {
    type: STRING,
    primaryKey: true
  },
  userName: {
    type: STRING,
    allowNull: false,
    unique: true,
    comment: '用户名，唯一'
  },
  password: {
    type: STRING,
    allowNull: false,
    comment: '密码'
  },
  nickName: {
    type: STRING,
    unique: true,
    allowNull: false,
    comment: '昵称'
  },
  avatar: {
    type: STRING,
    allowNull: false,
    comment: '头像地址'
  }
}, {
  defaultScope: {
    attributes: {
      // 排除密码，不返回密码
      exclude: ['password']
    }
  }
})

module.exports = User