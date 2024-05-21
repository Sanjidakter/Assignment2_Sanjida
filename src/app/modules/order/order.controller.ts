import { Request, Response } from 'express';
import { OrderServices } from './order.service';
import { createOrderSchema, CreateOrderInput } from './order.validation';
import { ZodError } from 'zod';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData: CreateOrderInput = createOrderSchema.parse(req.body);

    const result = await OrderServices.createOrderInDB(orderData);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: err.errors,
      });
    } else {
      res.status(500).json({
        success: false,
        message: err instanceof Error ? err.message : 'Something went wrong',
        error: err,
      });
    }
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {
    let result;
    const { email } = req.query as { email: string };

    if (email) {
      result = await OrderServices.getOrdersFromDB(email);
    } else {
      result = await OrderServices.getOrdersFromDB();
    }

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err instanceof Error ? err.message : 'Something went wrong',
      error: err,
    });
  }
};

export const OrderControllers = {
  createOrder,
  getOrders,
};
