import { Order } from './order.model';
import { Product } from '../product/product.model';
import { CreateOrderInput } from './order.validation';  

const createOrderInDB = async (orderData: CreateOrderInput) => {
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

const getOrdersFromDB = async (email?: string) => {
  const query = email ? { email } : {};
  return await Order.find(query);
};

export const OrderServices = {
  createOrderInDB,
  getOrdersFromDB,
};
