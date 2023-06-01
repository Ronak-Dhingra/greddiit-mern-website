import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  fname: { type: String, required: true},
  lname: { type: String, required: true },
  email: { type: String, required: true, unique: true, trim: true },
  uname: { type: String, unique: true, trim: true, required: true,  },
  age: { type: Number, required: true, min: 13, max: 99 },
  contact: { type: String, required: true },
  password: { type: String, required: true, trim: false, minlength: 5 }, 
  saved_posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  followers: [{ uid: {type: Schema.Types.ObjectId, ref: 'User'},
                uname : {type: String},
 }],
  following: [{ uid: {type: Schema.Types.ObjectId, ref: 'User' },
                uname : {type: String},}],
  subgreddiits: [{
    status: { type: String, enum: ['Blocked', 'Requested', 'Joined', 'Banned', 'Moderator'], default: 'Requested' },
    sg_id: { type: Schema.Types.ObjectId, ref: 'Subgreddiit' },
    date: { type: Date , default: Date.now}
  }],

});

userSchema.methods.checkPassword = function (password) {
    return bcrypt.compare(password, this.password);
  };

userSchema.methods.genToken = function () {
    return jwt.sign({ user: {id: this._id} }, process.env.JWT_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  };


const User = mongoose.model("User", userSchema);

export default User;