const express = require('express')
const handlebars = require('express-handlebars')
const db = require('./models')
const bodyParser = require('body-parser')
const session = require('express-session')
const app = express()
const port = process.env.PORT || 3000
const flash = require('connect-flash')
const passport = require('./config/passport')
const methodOverride = require('method-override')

app.engine('handlebars', handlebars({ 
  defaultLayout: 'main', 
  layoutsDir: 'views/Layouts',
  helpers: require('./config/handlebars-helpers')
  }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
app.use('/upload', express.static(__dirname + '/upload'))

app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  res.locals.user = req.user
  next()
})

app.listen(port, () => {
  console.log(`
  ================================
  ================================
  App listening on port ${port}!
  ================================
  ================================`)
})

require('./routes')(app, passport)