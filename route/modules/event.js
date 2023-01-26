const express = require('express')
const router = express.Router()


const eventctl = require('../../controllers/eventctl.js')



router.get('/', eventctl.eventPage)




module.exports = router