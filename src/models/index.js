const User = require('./User')
const Song = require('./Song')
const Square = require('./Square')
const Like = require('./Like')
const Comment = require('./Comment')


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


module.exports = {
  User,
  Song,
  Square,
  Like,
  Comment
}