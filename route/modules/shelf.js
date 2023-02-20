const express = require('express')
const router = express.Router()


const shelfctl = require('../../controllers/shelfctl.js')



router.get('/', shelfctl.shelfPage)
router.post('/findShelf', shelfctl.findShelf)
router.post('/findCounter', shelfctl.findCounter)
router.post('/newCounter', shelfctl.newCounter)
router.post('/newShelf', shelfctl.newShelf)



module.exports = router