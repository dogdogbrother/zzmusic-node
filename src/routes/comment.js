const Router = require('koa-router')
const { list, comment } = require('../controllers/comment.js')
const loginCheck = require('../middlewares/loginChecks')
const router = new Router({prefix:'/comment'})

router.get('/:squareId', list)
router.post('/:squareId', loginCheck, comment)

module.exports = router