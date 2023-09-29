const mongoose = require('mongoose')
const dotenv = require('dotenv')

process.on('uncaughtException', (err) => {
    console.log('Unhandled Exception! Shutting down...')
    console.log(err.name, err.message);
    process.exit(1)
})

dotenv.config({path: './config.env'})

const DB = process.env.DATABASE;


mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(con => {
    // console.log(con)
    console.log('DB connection successful!')
});



const app = require('./app')


const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`)
})

process.on('unhandledRejection', (err) => {
    console.log(err.name, err.message);
    console.log('Unhandled Rejection! Shutting down...')
    server.close(() => {
        process.exit(1)
    })
});
