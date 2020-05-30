if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000

const homeRouter = require('./routes/home')
// const loginRouter = require('./routes/login_signup')
// const planRouter = require('./routes/planTest')
// const trackRouter = require('./routes/trackPlan')
// const timerRouter = require('./routes/timer')

const mongoose = require('mongoose')
const connection = mongoose.connection

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
connection.once('open', () => {
    console.log("MongoDB database connection established successfully")
})

app.use(cors())
app.use(express.json())

app.use('/home', homeRouter)
// app.use('/login_signup', loginRouter)
// app.use('/planTest', planRouter)
// app.use('/trackPlan', trackRouter)
// app.use('/timer', timerRouter)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})
