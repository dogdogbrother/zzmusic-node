const User = require('./User')
const Song = require('./Song')
const Square = require('./Square')
const Like = require('./Like')
const Comment = require('./Comment')
const UserRelation = require('./UserRelation')

Square.belongsTo(User, {
  foreignKey: 'userId'
})

Square.belongsTo(Song, {
  foreignKey: 'songId'
})

User.hasMany(Square, {
  foreignKey: 'userId'
})

Comment.belongsTo(User, {
  foreignKey: ['userId', 'replyUserId']
})

UserRelation.belongsTo(User, {
  foreignKey: ['userId', 'followerId']
})

module.exports = {
  User,
  Song,
  Square,
  Like,
  Comment,
  UserRelation
}