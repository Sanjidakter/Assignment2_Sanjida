import { Schema, model } from "mongoose";
import { ProductModel, TProduct } from "./product.interface";

const variantSchema = new Schema({
  type: { type: String, required: true },
  value: { type: String, required: true },
});

const inventorySchema = new Schema({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});

const productSchema = new Schema<TProduct, ProductModel>({
  // id: { type: String, required: [true, "ID is required"], unique: true },
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: true, // Ensure the name is unique if you want to avoid duplicate products
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
  tags: {
    type: [String],
    required: [true, "Tags are required"],
  },
  variants: {
    type: [variantSchema],
    required: [true, "Variants are required"],
  },
  inventory: {
    type: inventorySchema,
    required: [true, "Inventory information is required"],
  },
});

// Query Middleware to filter out deleted products
productSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

productSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

productSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// Creating a custom static method
productSchema.statics.isProductExists = async function (name: string) {
  const existingProduct = await Product.findOne({ name });
  return existingProduct;
};

// Model export
export const Product = model<TProduct, ProductModel>("Product", productSchema);
