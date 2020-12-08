const seq = require('../db/seq')
const { STRING, ENUM } = require('../db/types')

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
  },
  gender: {
    type: ENUM,
    allowNull: false,
    default: "2",
    values: ["0", "1", "2"],
    comment: '性别,默认为2,保密'
  },
  characterSignature: {
    type: STRING,
    allowNull: false,
    default: '',
    comment: '个人签名'
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