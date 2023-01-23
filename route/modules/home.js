const express = require('express')
const router = express.Router()

const homeController = require('../../controllers/homectl')
const loginController = require('../../controllers/loginctl.js')



router.get('/', homeController.homePage)



module.exports = router