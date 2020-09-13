const { Square, User, Song } = require('../models')
const fse = require('fs-extra')
const uuid = require('node-uuid');

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
  async publish(ctx) {
    const { id } = ctx.session.info
    const data = {
      userId: id,
      type: 'dynamic',
      message: ctx.request.body.message
    }
    if (ctx.request.body.image) {
      const uid = uuid.v1()
      var path = `./${uid}.png`
      var base64 = ctx.request.body.image.replace(/^data:image\/\w+;base64,/, "");
      var dataBuffer = new Buffer(base64, 'base64'); //把base64码转成buffer对象，
      await fse.writeFile(path, dataBuffer).then(res => {
        data.image = `http://49.233.185.168:3003/cover-store/${uid}.png`
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