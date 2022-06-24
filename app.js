const express = require('express')
const app = express()

global.models = require('./models')
const authenticationMW = require('./middleware/authenticate')

app.use(express.urlencoded({extended: true}))

// Initialize sessions
const session = require('express-session')

app.use(session({
    secret: 'random123',
    resave: false,
    saveUninitialized: true
  }))

// Initialize routers

const accountRouter = require('./routes/accounts')
app.use('/account', accountRouter)

const postRouter = require('./routes/posts')
app.use('/posts', authenticationMW, postRouter)

const mustacheExpress = require('mustache-express')

// setting up Express to use Mustache Express as template pages 
app.engine('mustache', mustacheExpress())
    // the pages are located in views directory
app.set('views', './views')
    // extension will be .mustache
app.set('view engine', 'mustache')

app.use(express.static('public'))

let port = 8000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/error', (req, res) => {
    res.render('error')
})
