const { Square, User, Song } = require('../models')

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
    const dynamic = await Square.create({
      userId: id,
      type: 'dynamic',
      message: ctx.request.body.message
    })
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