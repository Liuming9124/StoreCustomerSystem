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
    },
    userlogin: (req, res) => {
        var user = req.body;
        var show
        session = db.session()
        session
        .run('match (n:boss{account: $acc ,password: $pas }) return n', {
            acc:user.username,
            pas:user.password
        })
        .then(result => {
            console.log(result.records)
            const singleRecord = result.records[0]
            const node = singleRecord.get(0)
            // result.records.forEach(record => {
            //     console.log(record.get('account'))
            //     show = record.get('account')
            // })
            
            show = node.properties.account
            console.log(node.properties.account)
            if (user.username==node.properties.account) {
                req.session.userName = user.username; // 登入成功，設定 session
            }
        })
        .catch(error => {
            console.log('login error')
            res.redirect('/login')
        })
        .then(()=>{
            res.redirect('/home')
        })
        .then(() => session.close())
    }
}

module.exports = loginController
