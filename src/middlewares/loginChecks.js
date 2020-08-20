
const loginCheck = async (ctx, next) => {
  if (ctx.session && ctx.session.info) {
    await next()
    return
  }
  ctx.status = 401
}

module.exports = loginCheck