import { Document, Model } from 'mongoose';

export interface IOrder extends Document {
  email: string;
  productId: string;
  price: number;
  quantity: number;
}

export interface OrderModel extends Model<IOrder> {}
