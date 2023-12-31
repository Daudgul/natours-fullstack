const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

const fs = require('fs');
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));



exports.getAllUsers = catchAsync(async (req,res, next) => {
    const users = await User.find();

        res.status(200).json({
            status: 'success',
            results: users.length,
            data: {
                users
            }
        })
    
})

exports.createUser = (req,res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    })
    
}

 exports.getUser = (req,res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    })
    
}

exports.updateUser = (req,res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    })
    
}

exports.deleteUser = (req,res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    })
    
}