import { Request, Response } from 'express';
import { OrderServices } from './order.service';
import { createOrderSchema } from './order.validation';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = createOrderSchema.parse(req.body);

    const result = await OrderServices.createOrderInDB(orderData);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const result = await OrderServices.getAllOrdersFromDB();

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const getOrdersByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.query as { email: string };

    const result = await OrderServices.getOrdersByEmailFromDB(email);

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully for user email!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

export const OrderControllers = {
  createOrder,
  getAllOrders,
  getOrdersByEmail,
};
