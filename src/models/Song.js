const seq = require('../db/seq')
const { STRING } = require('../db/types')

const User = seq.define('song', {
  song: {
    type: STRING,
    allowNull: false,
    unique: true,
    comment: '歌曲'
  },
  singer: {
    type: STRING,
    allowNull: false,
    comment: '歌手'
  },
  cover: {
    type: STRING,
    allowNull: true,
    comment: '封面'
  }
})

module.exports = User