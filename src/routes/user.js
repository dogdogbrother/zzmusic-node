const Router = require('koa-router')
const { login, register, info, logout } = require('../controllers/users')
const loginCheck = require('../middlewares/loginChecks')
const router = new Router({prefix:'/user'})

router.post('/login', login)
router.post('/register', register)
router.get('/info', loginCheck, info)
router.get('/logout', loginCheck, logout)

module.exports = router