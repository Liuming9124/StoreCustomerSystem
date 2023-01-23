const express = require('express')
const router = express.Router()


const loginController = require('../../controllers/loginctl.js')



router.get('/', loginController.loginPage)



module.exports = router