const seq = require('../db/seq')
const { STRING } = require('../db/types')

const UserRelation = seq.define('userRelation', {
  userId: {
      type: STRING,
      allowNull: false,
      comment: '用户id'
  },
  followerId: {
      type: STRING,
      allowNull: false,
      comment: '被关注用户的id'
  }
})

module.exports = UserRelation