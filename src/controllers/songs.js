const Song = require('../models/Song');
const Square = require('../models/Square');
const fse = require('fs-extra')
const Sequelize = require('sequelize');
const FileType = require('file-type');
const mm = require('music-metadata');
const uuid = require('node-uuid');

const Op = Sequelize.Op;
const getFileName = path =>{
  const pathArr = path.split('/')
  return pathArr[pathArr.length - 1]
}

class SongCtl {
  // 上传歌曲文件
  async uploadSong(ctx) {
    const file = ctx.req.files['file']
    // 我们拿到文件信息，通过文件夹名给文件夹重新命名。然后解析文件，拿到他的封面，歌手，专辑啥的信息
    const reqFileType = await FileType.fromFile(file.path)
    const newPath = `${file.path}.${reqFileType.ext}`
    await fse.move(file.path, newPath)
    const { common } = await mm.parseFile(newPath)
    if (common) {
      const uid = uuid.v1()
      const resBody = {
        songPath: newPath,
        songName: common.title || '',
        singer: common.artist || '',  // 待优化，可以操作数组 artists
        album: common.album || ''
      }
      if (common.picture && common.picture.length) {  // 如果存在的话，代表歌曲文件有封面
        await fse.writeFile(`/data/image-store/cover/${uid}${common.picture[0].description || '.jpg'}`,common.picture[0].data)
        resBody.coverPath = `http://49.233.185.168:3003/image-store/cover/${uid}${common.picture[0].description || '.jpg'}`
      }
      ctx.body = resBody
    } else {
      ctx.body = {
        path: newPath
      }
    }
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
    const { songPath, coverPath, isRepetition, ...surplus } = ctx.request.body
    const { id } = ctx.session.info
    // 这里差个优化，就是如果文件不存在了(有可能因为太久没操作临时文件删除了)，就报错

    // 当用户未传参数 isRepetition,代表是未确认上传歌曲状态
    // 根据用户名差,如果有这个歌曲了,就告诉用户找到的歌曲具体信息,问他是否确认上传
    if (!isRepetition) {
      const findSongList = await Song.findAll({
        attributes: ['songName', 'singer', 'coverPath', 'songPath', 'album'],
        where: {
          songName: surplus.songName
        }
      })
      if (findSongList.length) {
        return ctx.body = findSongList
      }
    }

    // 把文件送到 /data/music-store/下即可
    await fse.move(songPath, `/data/music-store/${getFileName(songPath)}`)
    if (coverPath) {  // 封面有可能是自己上传的，也有可能是文件自己带的，处理逻辑不一样
      if (coverPath.search('http://49.233.185.168:3003/image-store/cover/') > -1) { // 已经在cover文件夹里面了，不需要再操作了
        
      } else {
        fse.move(coverPath, `/data/image-store/cover/${getFileName(coverPath)}`)
      }
    }
    const coverType = (coverPath) => {
      if (coverPath.search('http://49.233.185.168:3003/image-store/cover/') > -1) {
        return coverPath
      } else {
        return `http://49.233.185.168:3003/image-store/cover/${getFileName(coverPath)}`
      }
    }
    const result = await Song.create({
      songPath: `http://49.233.185.168:3003/music-store/${getFileName(songPath)}`,
      coverPath: coverPath ? coverType(coverPath) : '',
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
  // 获取我的音乐
  async list(ctx) {
    const songList = await Song.findAll({
      attributes: ['songName', 'singer', 'coverPath', 'songPath', 'album', 'id'],
      where: {
        [Op.or]: [  // 根据搜索值，不仅要搜索歌曲名，还要搜索歌手，还要搜索专辑。都是模糊查询
          {
            songName: {
              [Op.like]: '%' + ctx.params.key + '%'
            }
          },
          {
            singer: {
              [Op.like]: '%' + ctx.params.key + '%'
            }
          },
          {
            album: {
              [Op.like]: '%' + ctx.params.key + '%'
            }
          }
        ]
      },
    })
    ctx.body = songList
  }
}

module.exports = new SongCtl()