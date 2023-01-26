const db = require("../route/modules/db");


const eventController = {

    eventPage: (req, res) => {
        if (req.session.userName){
            res.render('event',{
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

module.exports = eventController
