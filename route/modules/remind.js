const express = require('express')
const router = express.Router()


const remindctl = require('../../controllers/remindctl.js')



router.get('/', remindctl.remindPage)




module.exports = router