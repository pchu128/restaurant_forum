const express = require('express')
const handlebars = require('express-handlebars')
const db = require('./models')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.engine('handlebars', handlebars())
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(port, () => {
  db.sequelize.sync()
  console.log(`App listening on port ${port}!`)
})

require('./routes')(app)