const { Comment, User, Square } = require('../models/index');

class CommenCtr {
  async list(ctx) {
    const { squareId } =  ctx.params
    const comments = await Comment.findAll({
      include: [
        {
          model: User,
        }
      ],
      where: {
        squareId
      }
    })
    ctx.body = comments
  }

  async comment(ctx) {
    const { squareId } =  ctx.params
    const { id } = ctx.session.info
    await Comment.create({
      userId: id,
      ...ctx.request.body,
      squareId
    })
    const count = await Comment.count({
      where: {
        squareId
      }
    })
    await Square.update({
      comment: count,
    },{
      where: {
        id: squareId
      }
    })
    ctx.status = 200
  }
}

module.exports = new CommenCtr()