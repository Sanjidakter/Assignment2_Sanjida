import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import productValidationSchema from "./product.validation";
import { ZodError } from "zod";

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body; // Directly access req.body

    // Validate the request body using Zod
    const zodParsedData = productValidationSchema.parse(productData);

    // Call the service to create the product in the database
    const result = await ProductServices.createProductIntoDB(zodParsedData);

    // Send a success response
    res.status(201).json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({
        success: false,
        message: "Validation error",
        errors: err.errors,
      });
    } else {
      res.status(500).json({
        success: false,
        message: err instanceof Error ? err.message : "Something went wrong",
        error: err,
      });
    }
  }
};

const getProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query as { searchTerm?: string };

    const result = await ProductServices.getProductsFromDB(searchTerm);

    res.status(200).json({
      success: true,
      message: searchTerm
        ? `Products matching search term '${searchTerm}' fetched successfully!`
        : "Products fetched successfully!",
      data: result,
    });
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({
        success: false,
        message: "Validation error",
        errors: err.errors,
      });
    } else {
      res.status(500).json({
        success: false,
        message: err instanceof Error ? err.message : "Something went wrong",
        error: err,
      });
    }
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await ProductServices.getSingleProductFromDB(productId);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product fetched successfully!",
      data: result,
    });
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({
        success: false,
        message: "Validation error",
        errors: err.errors,
      });
    } else {
      res.status(500).json({
        success: false,
        message: err instanceof Error ? err.message : "Something went wrong",
        error: err,
      });
    }
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await ProductServices.deleteProductFromDB(productId);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: result,
    });
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({
        success: false,
        message: "Validation error",
        errors: err.errors,
      });
    } else {
      res.status(500).json({
        success: false,
        message: err instanceof Error ? err.message : "Something went wrong",
        error: err,
      });
    }
  }
};

// for update
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const productData = req.body;
    const zodParsedData = productValidationSchema.parse(productData);

    const result = await ProductServices.updateProductInDB(productId, zodParsedData);

    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: result,
    });
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({
        success: false,
        message: "Validation error",
        errors: err.errors,
      });
    } else {
      res.status(500).json({
        success: false,
        message: err instanceof Error ? err.message : "Something went wrong",
        error: err,
      });
    }
  }
};

export const ProductControllers = {
  createProduct,
  getProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
};
