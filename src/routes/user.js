const Router = require('koa-router')
const { login, register, info, logout, updateInfo, userInfo, follow } = require('../controllers/users')
const loginCheck = require('../middlewares/loginChecks')
const router = new Router({prefix:'/user'})

router.post('/login', login)
router.post('/register', register)
router.get('/info', loginCheck, info)
router.get('/logout', loginCheck, logout)
router.put('/info', loginCheck, updateInfo)
router.get('/info/:userId', userInfo)
router.put('/follow/:followUserId', loginCheck, follow)

module.exports = router