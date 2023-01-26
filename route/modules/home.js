const express = require('express')
const router = express.Router()

const homeCtl = require('../../controllers/homectl')



router.get('/', homeCtl.homePage)
router.post('/findcar', homeCtl.findcar)



module.exports = router