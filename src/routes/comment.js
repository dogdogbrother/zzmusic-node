const Router = require('koa-router')
const { list, comment, test, home } = require('../controllers/comment.js')
const loginCheck = require('../middlewares/loginChecks')
const router = new Router({prefix:'/comment'})

router.get('/:squareId', list)
router.post('/:squareId', loginCheck, comment)
router.get('/data/test', test) // 测试,稍后删除
router.get('/data/home', home) // 测试,稍后删除
module.exports = router