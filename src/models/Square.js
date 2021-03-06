const seq = require('../db/seq')
const { STRING, INTEGER, ENUM } = require('../db/types')

const Square = seq.define('square', {
  userId: {
    type: STRING,
    allowNull: false,
    comment: '关联的用户id'
  },
  type: {
    type: ENUM('upload', 'dynamic'),
    allowNull: false,
    comment: '上传歌曲和发动态的枚举'
  },
  message: {
    type: STRING,
    allowNull: false,
    comment: '动态内容'
  },
  image: {
    type: STRING,
    allowNull: true,
    comment: '动态图片'
  },
  songId: {
    type: INTEGER,
    allowNull: true,  // 可以不传，如果用户是发动态就不用写
    comment: '歌曲id'
  },
  comment: {
    type: INTEGER,
    allowNull: true,  // 可以不传，如果用户是发动态就不用写
    comment: '点赞数量计数',
    default: 0
  }
})

module.exports = Square