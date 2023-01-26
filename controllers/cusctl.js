const db = require("../route/modules/db");


const cusController = {

    cusPage: (req, res) => {
        if (req.session.userName){
            res.render('cus',{
                'cusname': '',
                'carid'  : '',
                'phone'  : ''
            })
        }
        else{
            res.redirect('/login')
        }
    }
}

module.exports = cusController
