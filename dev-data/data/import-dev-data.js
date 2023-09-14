const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel')

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

//   Read JSON file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

// import data into DB
const importData = async () => {
    try {
        await Tour.create(tours);
        console.log('Data successfully loaded!')
    } catch (error) {
        console.log(error)
    }
    process.exit()
}

// Delete All Data from DB
const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log('Data successfully deleted!')
    } catch (error) {
        console.log(error)
    }
    process.exit()
}

if(process.argv[2] === '--import'){
    importData();
}else if (process.argv[2] === '--delete'){
    deleteData();
}