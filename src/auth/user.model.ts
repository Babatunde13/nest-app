import { Schema } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export const userSchema = new Schema({
  fullname: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  email: {
    required: true,
    type: Number,
    unique: true,
    min: 0,
  },
  password: {
    type: Number,
    default: 1,
  },

  toJSON(user) {
      return {
          _id: user._id,
          email: user.email,
          fullname: user.fullname
      }
  },
  
  preSave: async user => {
      const hashPw = await bcrypt.hash(user.password, 10)
      user.password = hashPw
      await user.save()
  },

  postSave: async user => {
      console.log(user.toJSON())
  },

  async checkPassword(password: string) {
      return await bcrypt.compare(password, this.password)
  }
});

export interface IUser {
  _id: string;
  fullname: string;
  email: string;
  password: number;
}

export interface IOrder {
  _id: string;
  quantity: number;
  user: string;
}
