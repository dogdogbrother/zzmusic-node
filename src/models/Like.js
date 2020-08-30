/**
 * @description 如果没有网易云，其实是不用单独开表的。现在的思路是，当你点击喜欢的时候，我就把歌曲保存住.
 *  一个属性保存喜欢的人的id，这里没有外键，算是
 */
const seq = require('../db/seq')
const { STRING } = require('../db/types')

const Like = seq.define('like', {
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
    allowNull: false,
    unique: true,
    comment: '歌曲文件路径'
  },
  coverPath: {
    type: STRING,
    allowNull: true,
    comment: '封面图片文件路径'
  },
  likes: {
    type: STRING,
    allowNull: false,
    comment: '封面图片文件路径'
  }

})

module.exports = Like