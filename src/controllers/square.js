const { Square, User, Song } = require('../models')
const fse = require('fs-extra')
const uuid = require('node-uuid');
const HOST = require('../utils/host')

class SquareCtl {
  async list(ctx) {
    const list = await Square.findAll({
      order: [
        ['id', 'desc']
      ],
      include: [
        {
          model: User,
        },
        {
          model: Song,
        }
      ]
    })
    ctx.body = list
  }

  async listByUser(ctx) {
    const { userId } = ctx.params
    const list = await Square.findAll({
      order: [
        ['id', 'desc']
      ],
      include: [
        {
          model: User,
        },
        {
          model: Song,
        }
      ],
      where: { userId }
    })
    ctx.body = list
  }

  // 发布动态
  async publish(ctx) {
    const { id } = ctx.session.info
    const data = {
      userId: id,
      type: 'dynamic',
      message: ctx.request.body.message
    }
    if (ctx.request.body.image) {
      const uid = uuid.v1()
      var path = `/data/image-store/cover/${uid}.png`
      var base64 = ctx.request.body.image.replace(/^data:image\/\w+;base64,/, "");
      var dataBuffer = Buffer.from(base64, 'base64'); //把base64码转成buffer对象，
      await fse.writeFile(path, dataBuffer).then(res => {
        data.image = `${HOST}:3003/image-store/cover/${uid}.png`
      })
    }
    const dynamic = await Square.create(data)
    // const list = await Square.findAll({
      // order: [
      //   ['id', 'desc']
      // ],
    //   include: [
    //     {
    //       model: User,
    //     },
    //     {
    //       model: Song,
    //     }
    //   ]
    // })
    ctx.body = dynamic
  }
}

module.exports = new SquareCtl()