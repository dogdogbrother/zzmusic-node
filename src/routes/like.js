const Router = require('koa-router')
const { likeSong, list, unlikeSong } = require('../controllers/like')
const loginCheck = require('../middlewares/loginChecks')

const router = new Router({prefix:'/like'})

router.post('/like', loginCheck, likeSong)
router.post('/unlike', loginCheck, unlikeSong)
router.get('/', loginCheck, list)

module.exports = router