const db = require("../route/modules/db");
// var session = db.session()

const homeController = {

    homePage: (req, res) => {
        if (req.session.userName){
            res.render('home',{
                'cusname': '',
                'carid'  : '',
                'phone'  : ''
            })
        }
        else{
            res.redirect('/login')
        }
        // var show
        // session = db.session()
        // session
        // .run('MERGE (james:Person {name : $nameParam}) RETURN james.name AS name', {
        //     nameParam: 'James'
        // })
        // .then(result => {
        //     result.records.forEach(record => {
        //         // console.log(record.get('name'))
        //         show = record.get('name')
        //     })
        // })
        // .catch(error => {
        //     console.log(error)
        // })
        // .then(()=>{
        //     res.render('home',{
        //         'show': req.session.userName
        //     });
        // })
        // .then(() => session.close())
    },
    findcar: (req, res) => {
        if (req.session.userName){
            var find = req.body;
            var show
            session = db.session()
            session
            .run('match (n:cus{carid:$car}) return n', {
                car:find.find
            })
            .then(result => {
                console.log(result.records)
                const singleRecord = result.records[0]
                const node = singleRecord.get(0)

                res.render('home',{
                    'cusname': node.properties.name,
                    'carid'  : node.properties.carid,
                    'phone'  : node.properties.phone
                })
                // result.records.forEach(record => {
                    // console.log(record.get('phone'))
                    // show = record.get('car')
                // })
                
                // show = node.properties.account
                // console.log(node.properties.account)
                
            })
            .catch(error => {
                console.log('find error')
                
                res.render('home',{
                    'cusname': '????????????',
                    'carid'  : '',
                    'phone'  : ''
                })
            })
            .then(() => session.close())
            // .then(() => res.redirect('/home'))
            // res.redirect('/home')
            
        }
        else{
            res.redirect('/login')
        }
    }
}

module.exports = homeController


// ?????????
// match (c:cus{carid:'MEF-3811'})
// create (o:event{time:'2023/01/10',reason:'?????????',solution:'??????100cc',price:'150',distance:'23456'})
// create (c)-[:fix]->(o)