const { Comment, User, Square } = require('../models/index');

class CommenCtr {
  async test() {
    ctx.body = {
      errCode: 0,
      errMsg: "",
      data: {
        banner: [{
          bookId: 743917716766795,
          img: "http://49.233.185.168:3003/image-store/cover/34f5c8d0-1f80-11eb-8168-b3cd37fd9728YA.jpg",
          jumpCont: "",
          jumpType: 0,
          position: 0,
        }],
        man: [{
          bookAuthor: "—",
          bookCategoryName: "都市",
          bookCover: "http://49.233.185.168:3003/image-store/cover/e0938c60-200a-11eb-acd7-25f73ece9cd5.jpg",
          bookId: 781341098508289,
          bookName: "超燃狂少",
          bookSummary: "我叫王浩，大学毕业后，找不到好工作，混了三年，一事无成。 正当自己处于人生低谷的时候，一个意外的电话，却让我的命运出现了拐点。"
        }],
        women: []
      }
    }
  }
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