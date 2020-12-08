const { User, Like, UserRelation } = require('../models/index');
const doCrypto = require('../utils/cryp')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const uuid = require('node-uuid');
const HOST = require('../utils/host')
const fse = require('fs-extra')

class UsersCtl {
  // 登陆
  async login(ctx) {
    ctx.verifyParams({
      userName: { type: 'string', required: true },
      password: { type: 'string', required: true },
    })
    const { userName, password } = ctx.request.body
    const user = await User.findOne({
      attributes: ['userName', 'nickName', 'id', 'avatar', 'gender', 'characterSignature'],
      where: {
        [Op.and]: [{ userName },{ password: doCrypto(password) }]
      }
    })
    if (user) {
      const likeSongs = await Like.findAll({
        attributes: ['id'],
        where: {
          likes: {
            [Op.like]: '%'+ user.id +'%'
          }
        }
      })
      ctx.session.info = user
      ctx.body = { ...user.dataValues, likes: likeSongs.map(song => song.id) }
    } else {
      return ctx.throw(403, '账户名或者密码错误')
    }
  }
  // 注册
  async register(ctx) {
    ctx.verifyParams({
      userName: { type: 'string', required: true },
      nickName: { type: 'string', required: true },
      password: { type: 'string', required: true },
      affirmPassword: { type: 'string', required: true },
    })
    const avatarIndex = Math.floor((Math.random()*8)+1);
    const { userName, nickName, password, affirmPassword } = ctx.request.body
    if (password !== affirmPassword) {
      return ctx.throw(403, '两次密码输入不一致')
    }
    const repetitionUser = await User.findOne({
        where: {
          [Op.or]: [{ userName },{ nickName }]
        }
    })
    if (repetitionUser) {
      if (repetitionUser.userName === userName) {
        return ctx.throw(409,'用户名已占用')
      }
      if (repetitionUser.nickName === nickName) {
        return ctx.throw(409,'昵称已占用')
      }
    }
    const result = await User.create({
      id: uuid.v1(),
      userName,
      password: doCrypto(password),
      nickName,
      avatar: `${HOST}:3003/image-store/avatar/${avatarIndex}.jpg`,
      gender: "2",
      characterSignature: ""
    })
    delete result.password
    delete result.createdAt
    delete result.updatedAt
    const resBody = {
      userName: result.userName,
      nickName: result.nickName,
      avatar: result.avatar,
      id: result.id,
      gender: result.gender,
      characterSignature: result.characterSignature
    }
    ctx.session.info = resBody
    ctx.body = resBody
  }

  // 获取用户信息
  async info(ctx) {
    const user = await User.findOne({
      where: {
        id: ctx.session.info.id
      }
    })
    if (!user) {
      return delete ctx.session.info
    }
    ctx.session.info = user
    // 这里要操作下，把用户喜欢的歌曲的id组成数组给用户
    const likeSongs = await Like.findAll({
      attributes: ['id'],
      where: {
        likes: {
          [Op.like]: '%'+ user.id +'%'
        }
      }
    })
    ctx.body = {
      ...user.dataValues,
      likes: likeSongs.map(song => song.id)
    }
  }

  // 退出登陆
  async logout(ctx) {
    delete ctx.session.info
    ctx.status = 205
  }

  // 更新个人信息
  async updateInfo(ctx) {
    const { id } = ctx.session.info
    const uid = uuid.v1()
    let waitUpdateAttribute = ""
    // 如果有avatar,就说明是传了个头像
    if (ctx.request.body.avatar) {
      var path = `/data/image-store/cover/${uid}.png`
      var base64 = ctx.request.body.avatar.replace(/^data:image\/\w+;base64,/, "");
      var dataBuffer = Buffer.from(base64, 'base64'); //把base64码转成buffer对象，
      await fse.writeFile(path, dataBuffer)
      ctx.request.body.avatar = `${HOST}:3003/image-store/cover/${uid}.png`
    }
    Object.keys(ctx.request.body).forEach(key => {
      waitUpdateAttribute = key
    })
    if (!waitUpdateAttribute) return ctx.status = 400
    await User.update({
      [waitUpdateAttribute]: ctx.request.body[waitUpdateAttribute]
    }, {
      where: {
        id
      }
    })
    const res = await User.findOne({
      attributes: [waitUpdateAttribute],
      where: {
        id
      }
    })
    ctx.body = res
  }

  // 获取其他用户的个人信息
  async userInfo(ctx) {
    const { userId } = ctx.params
    const user = await User.findOne({
      attributes: ['nickName', 'avatar', 'gender', 'characterSignature', "id"],
      where: {
        id: userId
      }
    })
    const bodyData = {
      yourself: false,
      isFollow: false
    }
    const sessionInfo = ctx.session.info
    // 意思是用户所查看的人就是他自己
    if (sessionInfo && sessionInfo.id === userId) {
      bodyData.yourself = true
    } else if(sessionInfo) {
      const relation = await UserRelation.findOne({
        where: {
          [Op.and]: [{ userId: sessionInfo.id },{ followerId: userId }]
        }
      })
      // 如果能找到,就说明是关注状态
      bodyData.isFollow = relation ? true : false
    }
    // 只要是和用户有关的，都找出来
    const followList = await UserRelation.findAll({
      where: {
        [Op.or]: [{ userId: userId },{ followerId: userId }]
      }
    })
    console.log(followList);
    ctx.body = {
      ...user.dataValues,
      ...bodyData,
      following: followList.filter(follow => follow.userId === userId).length,
      follower: followList.filter(follow => follow.followerId === userId).length
    }
  }
  // 关注某用户
  async follow(ctx) {
    const { id } = ctx.session.info
    const { followUserId } = ctx.params
    // actionType 为 true,就关注,false就是取消关注
    const { actionType } = ctx.request.body
    console.log(actionType);
    const relation = await UserRelation.findOne({
      where: {
        [Op.and]: [{ userId: id },{ followerId: followUserId }]
      }
    })
    // 假如我要取消关注，同时发现其实并没有关注过此用户
    // 或者想要关注此用户，但是已经关注过了 两者都是参数有问题
    if ((!actionType && !relation) || (actionType && relation)) {
      return ctx.status = 400
    }
    if (actionType) {
      const status = await UserRelation.create({
        userId: id,
        followerId: followUserId,
      })
      if (status) {
        ctx.body = true
      } else ctx.status = 500
    } else {
      const status = await UserRelation.destroy({
        where: {
          [Op.and]: [{ userId: id },{ followerId: followUserId }]
        }
      })
      if (status) {
        ctx.body = false
      } else ctx.status = 500
    }
  }
}

module.exports = new UsersCtl()