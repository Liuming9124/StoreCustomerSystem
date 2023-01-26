const db = require("../route/modules/db");


const shelfController = {

    shelfPage: (req, res) => {
        if (req.session.userName){
            res.render('shelf',{
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

module.exports = shelfController
