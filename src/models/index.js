const User = require('./User')
const Song = require('./Song')
const Square = require('./Square')

Square.belongsTo(User, {
  foreignKey: 'userId'
})

Square.belongsTo(Song, {
  foreignKey: 'songId'
})

User.hasMany(Square, {
  foreignKey: 'userId'
})

module.exports = {
  User,
  Song,
  Square
}