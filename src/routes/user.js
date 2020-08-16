const Router = require('koa-router')
const { login, register, info, logout } = require('../controllers/users')

const router = new Router({prefix:'/user'})

router.post('/login', login)
router.post('/register', register)
router.get('/info', info)
router.get('/logout', logout)

module.exports = router