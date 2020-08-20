const Router = require('koa-router')
const { uploadSong, uploadCover, song, list } = require('../controllers/songs')
const loginCheck = require('../middlewares/loginChecks')
const koaFrom = require('formidable-upload-koa')

const router = new Router({prefix:'/song'})

router.post('/upload-song', loginCheck, koaFrom(), uploadSong)
router.post('/upload-cover', loginCheck, koaFrom(), uploadCover)

router.post('/song', loginCheck, song)
router.get('/list/:key', list)

module.exports = router