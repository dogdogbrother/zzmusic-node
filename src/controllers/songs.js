const Song = require('../models/Song');
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
    const {file} = ctx.req.files['file']
    ctx.body = file.path
  }
  // 上传歌曲封面
  async uploadCover(ctx) {
    const file = ctx.req.files['file']
    ctx.body = file.path
  }
  // 上传真正的歌曲和歌手信息
  async song(ctx) {
    ctx.verifyParams({
      song: { type: 'string', required: true },
      singer: { type: 'string', required: true },
    })
    const { song, singer, cover } = ctx.request.body
    // 这里差个问题，就是如果文件不存在了(有可能因为太久没操作临时文件删除了)，就报错

    // 把文件送到 /data/music-store/下即可
    await fse.move(song, '/data/music-store')
    if (cover) {
      fse.move(song, '/data/cover-store')
    }
    const result = await Song.create({
      song: `http://49.233.185.168:3001/music-store/${getFileName(song)}`,
      singer,
      cover: cover ? `http://49.233.185.168:3001/cover-store/${getFileName(cover)}` : ''
    })
    ctx.body = result
  }

  async list(ctx) {
    const songList = await Song.findAll({
      attributes: ['song', 'singer'],
      where: {
        song: ctx.params.key
      },
    })
    ctx.body = songList
  }
}

module.exports = new SongCtl()