const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({path: './config.env'})

const DB = process.env.DATABASE;

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(con => {
    console.log(con)
    console.log('DB connection successful!')
}).catch(error => {
    // Handle the error
    console.log("I am Error" , error)
  });

const app = require('./app')

// console.log(process.env)

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App running on port ${port}...`)
})

