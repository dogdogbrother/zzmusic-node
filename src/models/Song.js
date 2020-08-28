const seq = require('../db/seq')
const { STRING } = require('../db/types')

const User = seq.define('song', {
  songName: {
    type: STRING,
    allowNull: false,
    comment: '歌曲名'
  },
  singer: {
    type: STRING,
    allowNull: false,
    comment: '歌手名'
  },
  album: {
    type: STRING,
    allowNull: true,
    comment: '专辑名'
  },
  songPath: {
    type: STRING,
    allowNull: true,
    unique: true,
    comment: '歌曲文件路径'
  },
  coverPath: {
    type: STRING,
    allowNull: true,
    comment: '封面图片文件路径'
  }
})

module.exports = User