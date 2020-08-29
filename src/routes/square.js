const Router = require('koa-router')
const { list, publish } = require('../controllers/square')
const loginCheck = require('../middlewares/loginChecks')
const router = new Router({prefix:'/square'})

router.get('/list', list)
router.post('/publish', loginCheck, publish)

module.exports = router