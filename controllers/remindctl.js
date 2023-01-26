const db = require("../route/modules/db");


const remindController = {

    remindPage: (req, res) => {
        if (req.session.userName){
            res.render('remind',{
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

module.exports = remindController
