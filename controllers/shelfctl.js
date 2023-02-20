const { json } = require("neo4j-driver-core");
const { resolve } = require("path");
const db = require("../route/modules/db");


const shelfController = {

    shelfPage: (req, res) => {
        if (req.session.userName){
            var show =[]
            session = db.session()
            session
            .run('match (n:shelf) return n.name as name ')

            .then(result => {
                result.records.forEach(record => {
                    show.push(record.get('name'))
                });
               
            })
            .catch(error => {
                console.log(error)
            })
            .then(() => session.close())
            .then(() => {
                res.render('shelf',{
                    'cusname': '',
                    'carid'  : '',
                    'phone'  : '',
                    'shelf': show,
                    'counter':'',
                    'item': ''
                })
            })
        }
        else{
            res.redirect('/login')
        }
    },
    findShelf: (req, res) => {
        if (req.session.userName){
            console.log(req.body.shelfValue)
            show = []
            session = db.session()
            session
            .run(`match (n:shelf{name:'${req.body.shelfValue}'}) -[:has]-> (p) return p.name as name`)
            .then(result => {
                result.records.forEach(record => {
                    show.push(record.get('name'))
                    console.log(record.get('name'))
                });
            })
            .catch(error => {
                console.log(error)
            })
            .then(() => session.close())
            .then(() => {
                console.log(show)
                res.render('shelf',{
                    'cusname': '',
                    'carid'  : '',
                    'phone'  : '',
                    'shelf': [req.body.shelfValue],
                    'counter': show,
                    'item': ''
                })
            })

        }
        else{
            res.redirect('/login')
        }

    },
    findCounter: (req,res) => {
        if (req.session.userName){
            console.log(req.body)
            show = []
            session = db.session()
            session
            .run(`match (y:shelf{name:'${req.body.shelf}'})-[has]->(x:counter{name:'${req.body.counter}'})-[own]->(n) return n.name as name`)
            .then(result => {
                result.records.forEach(record => {
                    show.push(record.get('name'))
                    console.log(record.get('name'))
                });
            })
            .catch(error => {
                console.log(error)
            })
            .then(() => session.close())
            .then(() => {
                console.log(show)
                res.render('shelf',{
                    'cusname': '',
                    'carid'  : '',
                    'phone'  : '',
                    'shelf': [req.body.shelfValue],
                    'counter': show,
                    'item': show
                })
            })

        }
        else{
            res.redirect('/login')
        }
    },
    newShelf: (req, res) => {
        if (req.session.userName){
            shelfName = req.body.newname
            shelfAmount = req.body.newamount
            wind = ''
            cmd = ''
            var p = new Promise((resolve, reject) => {
                lowName = shelfName.toLowerCase()
                for (let index = 1; index <= shelfAmount; index++) {
                    wind += `{name:'${req.body.newname.toLowerCase()}${index}',shelf:'${req.body.newname}'}`
                    if (index!=shelfAmount){
                        wind+=','
                    }
                }
                cmd = `
                    merge (a:shelf{name:'${shelfName}'})
                    with a
                    unwind [
                        ${wind}
                    ] as p
                    create (m:counter) set m = p
                    create (a)-[:has]->(m)
                    return a,m
                `
                resolve()
                // console.log(cmd)
            })
            p.then(() => {
                // res.redirect('/shelf')
                console.log('hello')
                console.log(cmd)
                var show =[]
                session = db.session()
                session
                .run(cmd)
                .then(result => {
                    result.records.forEach(record => {
                        show.push(record.get('name'))
                        console.log(record.get('name'))
                    });
                })
                .catch(error => {
                    console.log(error)
                })
                .then(() => session.close())
                .then(() => {
                    res.redirect('/shelf')
                })
            })
        }
        else{
            res.redirect('/login')
        }
    },
    newCounter: (req, res) => {
        console.log(req.body)
        if (req.session.userName){
            shelfName = req.body.shelfName
            ctrname = req.body.newcname
            cmd = ''
            var p = new Promise((resolve, reject) => {
                cmd = `
                    match (a:shelf{name:'${shelfName}'})
                    create (m:counter{name:'${ctrname}'}) 
                    create (a)-[:has]->(m)
                    return a,m
                `
                console.log(cmd)
                resolve()
            })
            p.then(() => {
                console.log(cmd)
                var show =[]
                session = db.session()
                session
                .run(cmd)
                .catch(error => {
                    console.log(error)
                })
                .then(() => session.close())
                .then(() => {
                    res.redirect('/shelf')
                })
            })
        }
        else{
            res.redirect('/login')
        }
    }
}

module.exports = shelfController
