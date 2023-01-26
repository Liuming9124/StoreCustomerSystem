const express = require('express')
const router = express.Router()


const shelfctl = require('../../controllers/shelfctl.js')



router.get('/', shelfctl.shelfPage)




module.exports = router