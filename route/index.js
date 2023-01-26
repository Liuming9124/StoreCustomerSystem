const home       = require('./modules/home')
const login      = require('./modules/login')
const shelf      = require('./modules/shelf')
const cus      = require('./modules/cus')
const event      = require('./modules/event')
const remind      = require('./modules/remind')

module.exports = app => {
  app.use('/home',  home)
  app.use('/login', login)
  app.use('/shelf', shelf)
  app.use('/cus', cus)
  app.use('/event', event)
  app.use('/remind', remind)
  app.use('/logout',(req, res) => {
    req.session.destroy();
    res.redirect('/login');
  })
  app.use('/', (req, res) => { return res.redirect('/login') })
}
