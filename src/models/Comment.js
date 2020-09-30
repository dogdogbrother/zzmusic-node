/**
 * @description 每条评论都是一条数据，可以剖析下，一共有3种类型的评论，有多个引用类型
 *    1. 直接评论，有广场id(外键)，评论人id(外键)
 *    2. 对一级评论进行二级评论，有广场id(外键)，根评论id
 *    3. 对2级的评论做回复评论，多一个被回复人id(外键)
 */
const seq = require('../db/seq')
const { STRING, INTEGER } = require('../db/types')

const comment = seq.define('comment', {
  content: {
    type: STRING,
    allowNull: false,
    comment: '评论内容',
  },
  userId: {
    type: STRING,
    allowNull: false,
    comment: '评论用户id'
  },
  squareId: {
    type: INTEGER,
    allowNull: false,
    comment: '广场动态id'
  },
  rootCommentId: {
    type: INTEGER,
    allowNull: true,
    comment: '二级评论必有的根目录id'
  },
  replyUserId: {
    type: INTEGER,
    allowNull: true,
    comment: '二级评论中回复了用户，必有此id'
  }
})

module.exports = comment