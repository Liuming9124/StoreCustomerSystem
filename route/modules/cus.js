const express = require('express')
const router = express.Router()


const cusctl = require('../../controllers/cusctl.js')



router.get('/', cusctl.cusPage)




module.exports = router