const { Like } = require('../models/index');
const Op = require('sequelize').Op;

class LikeCtl {
  /**
   * @description 点击喜欢歌曲。首先要判断这歌曲有没有在 like 表里面，在的话，把 userid push进 likes 去.
   *  如果 like 表里面没有，就创建，并 likes 里面设置值
   */
  async likeSong(ctx) {
    const { song } = ctx.request.body
    const { id } = ctx.session.info
    const findSong = await Like.findOne({
      where: {
        id: song.id
      }
    })
    if (findSong) { // 如果喜欢的歌曲已经存在表里面
      const likesArr = JSON.parse(findSong.likes)
      if (likesArr.find(songId => songId === id)) { // 先检查自己是不是已经关注过了
        return ctx.status = 403
      } else {      // 没有的话，把自己更新进去
        likesArr.push(id)
        await Like.update({
          likes: JSON.stringify(likesArr)
        }, {
          where: {
            id: song.id
          }
        })
      }
    } else { // 如果喜欢的新歌，那么就创建
      await Like.create({
        ...song,
        likes: JSON.stringify([id])
      })
    }
    const songs = await Like.findAll({
      attributes: ['id'],
      where: {
        likes: {
          [Op.like]: '%'+id+'%'
        }
      }
    })
    ctx.body = songs.map(song => song.id)
  }
  async list(ctx) {
    const { id } = ctx.session.info
    const songs = await Like.findAll({
      where: {
        likes: {
          [Op.like]: '%'+ id +'%'
        }
      }
    })
    ctx.body = songs
  }
  async unlikeSong(ctx) {
    const { id } = ctx.session.info
    const { song } = ctx.request.body
    const like = await Like.findOne({
      where: {
        id: song.id
      }
    })
    like.likes = JSON.parse(like.likes)
    const likes = like.likes.filter(like => like !== id)
    console.log(likes);
    console.log(like.likes);
    // 如果过滤过的数组还是和以前一样，代表用户没有喜欢这首歌
    if (likes.length === like.likes.length) {
      return ctx.status = 403
    }
    // 更新数据
    await Like.update({
      likes: JSON.stringify(likes)
    }, {
      where: {
        id: song.id
      }
    })
    const songs = await Like.findAll({
      attributes: ['id'],
      where: {
        likes: {
          [Op.like]: '%'+ id +'%'
        }
      }
    })
    ctx.body = songs.map(song => song.id)
  }
}

module.exports = new LikeCtl()