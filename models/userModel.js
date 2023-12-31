const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator'); // You need to import the validator library if you're using it
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A user must have a name'],
        trim: true,
        // You can add a validation function like this (example: allow only letters and spaces):
        // validate: {
        //     validator: function(value) {
        //         return /^[a-zA-Z\s]*$/.test(value);
        //     },
        //     message: 'Name must contain only letters and spaces'
        // }
    },
    email: {
        type: String,
        required: [true, 'A user must have an email'],
        unique: true, // Ensure that emails are unique
        lowercase: true, // Convert email to lowercase
        validate: [validator.isEmail, 'Invalid email address'],
    },
    photo: {
        type: String,
        // 'required' should not be set if a user is not required to have a photo
    },
    role: {
        type: String,
        enum: ['user', 'guide', 'lead-guide', 'admin'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, 'A user must have a password'],
        minlength: 8, // You can set a minimum password length
        select: false 
        // You might want to add additional validation for password complexity
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Password confirmation is required'],
        validate: {
            validator: function(value) {
                // You can add custom logic to validate that passwordConfirm matches password
                return value === this.password;
            },
            message: 'Passwords do not match',
        },
    },
    passwordChngedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date
});


userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);

    this.passwordConfirm = undefined;
    next();
})

userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.methods.changedPasswordAfter = function(JWTTimesstamp) {
    if (this.passwordChangedAt){
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return JWTTimesstamp < changedTimestamp;

    }
    return false
}

userSchema.method.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
}


const User = mongoose.model('User', userSchema);

module.exports = User;
