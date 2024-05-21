import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import productValidationSchema from "./product.validation";

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
  } catch (err: any) {
    // Handle validation errors and other errors
    if (err.name === "ZodError") {
      res.status(400).json({
        success: false,
        message: "Validation error",
        error: err.errors,
      });
    } else {
      res.status(500).json({
        success: false,
        message: err.message || "Something went wrong",
        error: err,
      });
    }
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProductsFromDB();

    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: err,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await ProductServices.getSingleProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: "Product fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: err,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await ProductServices.deleteProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: err,
    });
  }
};

// for update
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const productData = req.body;
    const zodParsedData = productValidationSchema.parse(productData);

    const result = await ProductServices.updateProductInDB(
      productId,
      zodParsedData
    );

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: result,
    });
  } catch (err: any) {
    if (err.name === "ZodError") {
      res.status(400).json({
        success: false,
        message: "Validation error",
        error: err.errors,
      });
    } else {
      res.status(500).json({
        success: false,
        message: err.message || "Something went wrong",
        error: err,
      });
    }
  }
};

// for search
const searchProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;

    const result = await ProductServices.searchProductsInDB(
      searchTerm as string
    );

    res.status(200).json({
      success: true,
      message: `Products matching search term '${searchTerm}' got successfully!`,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: err,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  searchProducts,
};
