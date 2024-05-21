import { Order } from './order.model';
import { Product } from '../product/product.model';

const createOrderInDB = async (orderData: any) => {
  // Check product availability
  const product = await Product.findById(orderData.productId);

  if (!product) {
    throw new Error('Product not found');
  }

  if (product.inventory.quantity < orderData.quantity) {
    throw new Error('Insufficient quantity available in inventory');
  }

  // Update product inventory
  product.inventory.quantity -= orderData.quantity;
  product.inventory.inStock = product.inventory.quantity > 0;
  await product.save();

  const order = await Order.create(orderData);
  return order;
};

const getAllOrdersFromDB = async () => {
  return await Order.find();
};

const getOrdersByEmailFromDB = async (email: string) => {
  return await Order.find({ email }); 
};


export const OrderServices = {
  createOrderInDB,
  getAllOrdersFromDB,
  getOrdersByEmailFromDB,
};
