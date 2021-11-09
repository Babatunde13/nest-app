import { Schema } from 'mongoose';

export const productSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      default: []
    },
  ],
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  price: {
    required: true,
    type: Number,
    min: 0,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  description: {
    type: String,
    minLength: 10,
  },
});

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  orders: string[];
  user: string;
}

export interface IOrder {
  _id: string;
  quantity: number;
  user: string;
}
