const Router = require('koa-router')
const { list, comment, test } = require('../controllers/comment.js')
const loginCheck = require('../middlewares/loginChecks')
const router = new Router({prefix:'/comment'})

router.get('/:squareId', list)
router.post('/:squareId', loginCheck, comment)
router.get('/data', loginCheck, test) // 测试,稍后删除

module.exports = router