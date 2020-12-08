const Router = require('koa-router')
const { list, listByUser, publish } = require('../controllers/square')
const loginCheck = require('../middlewares/loginChecks')
const router = new Router({prefix:'/square'})

router.get('/list', list)
router.get('/list/:userId', listByUser)
router.post('/publish', loginCheck, publish)

module.exports = router