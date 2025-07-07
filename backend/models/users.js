const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userModel = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength:6,
    },
    friends :[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

    isOnboarded: {
        type: Boolean,
        default: false
    }
   
})
userModel.pre("save",async function(next) {
  if(!this.isModified("password")) return next();
    try {
      const salt = await bcrypt.genSalt(10);
     this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      next(error);
    }
  }
)
 userModel.methods.matchPassword = async function(password){
 const isPassword = await bcrypt.compare(password,this.password);
   return isPassword;
}

const User = mongoose.model('User', userModel);
module.exports = User;