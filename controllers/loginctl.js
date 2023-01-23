const db = require("../route/modules/db");
// var session = db.session()

const loginController = {

    loginPage: (req, res) => {
        var show
        session = db.session()
        session
        .run('MERGE (james:Person {name : $nameParam}) RETURN james.name AS name', {
            nameParam: 'James'
        })
        .then(result => {
            result.records.forEach(record => {
                // console.log(record.get('name'))
                show = record.get('name')
            })
        })
        .catch(error => {
            console.log(error)
        })
        .then(()=>{
            res.render('login',{
                'show': show
            });
        })
        .then(() => session.close())
    }
}

module.exports = loginController
