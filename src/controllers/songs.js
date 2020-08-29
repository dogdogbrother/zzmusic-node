const Song = require('../models/Song');
const Square = require('../models/Square');
const fse = require('fs-extra')
const Sequelize = require('sequelize');

const Op = Sequelize.Op;
const getFileName = path =>{
  const pathArr = path.split('/')
  return pathArr[pathArr.length - 1]
}

class SongCtl {
  // 上传歌曲文件
  async uploadSong(ctx) {
    const { path } = ctx.req.files['file']
    ctx.body = path
  }
  // 上传歌曲封面
  async uploadCover(ctx) {
    const file = ctx.req.files['file']
    ctx.body = file.path
  }
  // 上传真正的歌曲和歌手信息
  async song(ctx) {
    ctx.verifyParams({
      songName: { type: 'string', required: true },
      singer: { type: 'string', required: true },
      songPath: { type: 'string', required: true }
    })
    const { songPath, coverPath, ...surplus } = ctx.request.body
    const { id } = ctx.session.info
    // 这里差个优化，就是如果文件不存在了(有可能因为太久没操作临时文件删除了)，就报错

    // 把文件送到 /data/music-store/下即可
    await fse.move(songPath, `/data/music-store/${getFileName(songPath)}`)
    if (coverPath) {
      fse.move(coverPath, `/data/cover-store/${getFileName(coverPath)}`)
    }
    const result = await Song.create({
      songPath: `http://49.233.185.168:3003/music-store/${getFileName(songPath)}`,
      coverPath: coverPath ? `http://49.233.185.168:3003/cover-store/${getFileName(coverPath)}` : '',
      ...surplus
    })
    // 存好了还要操作广场model,这里对歌曲名做了个处理，放的是歌曲的时间戳，前端拿到后会替换掉
    await Square.create({
      userId: id,
      type: 'upload',
      message: `上传了一个歌曲${result.songName}`,
      songId: result.id
    })
    ctx.body = result
  }

  async list(ctx) {
    const songList = await Song.findAll({
      attributes: ['songName', 'singer', 'coverPath', 'songPath', 'album', 'id'],
      where: {
        songName: ctx.params.key
      },
    })
    ctx.body = songList
  }
}

module.exports = new SongCtl()