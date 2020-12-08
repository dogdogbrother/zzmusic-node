const { Comment, User, Square } = require('../models/index');

class CommenCtr {
  // 拿到该广场动态的全部评论，然后根据rootCommentId设置层级。
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
  // 评论，有一级评论，二级评论，三级评论(暂不开放)，都放在一起
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