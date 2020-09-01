const { User, Like } = require('../models/index');
const doCrypto = require('../utils/cryp')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const uuid = require('node-uuid');
class UsersCtl {
    // 登陆
    async login(ctx) {
      ctx.verifyParams({
        userName: { type: 'string', required: true },
        password: { type: 'string', required: true },
      })
      const { userName, password } = ctx.request.body
      const user = await User.findOne({
        attributes: ['userName', 'nickName', 'id', 'avatar'],
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
        avatar: `http://49.233.185.168:3003/image-store/avatar/${avatarIndex}.jpg`
      })
      delete result.password
      delete result.createdAt
      delete result.updatedAt
      const resBody = {
        userName: result.userName,
        nickName: result.nickName,
        avatar: result.avatar,
        id: result.id
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
}

module.exports = new UsersCtl()