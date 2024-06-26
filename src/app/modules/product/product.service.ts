import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProductIntoDB = async (ProductData: TProduct) => {
  if (await Product.isProductExists(ProductData.name)) {
    throw new Error("Product already exists!");
  }
  const result = await Product.create(ProductData);
  return result;
};

const getProductsFromDB = async (searchTerm?: string) => {
  const query = searchTerm
    ? {
        $or: [
          { name: { $regex: searchTerm, $options: "i" } },
          { description: { $regex: searchTerm, $options: "i" } },
          { category: { $regex: searchTerm, $options: "i" } },
          { tags: { $regex: searchTerm, $options: "i" } },
          { 'variants.value': { $regex: searchTerm, $options: 'i' } },
          
          
        ],
      }
    : {};
  return await Product.find(query);
};

const getSingleProductFromDB = async (id: string) => {
  // Assuming the ID is stored in the `_id` field
  const result = await Product.findOne({ _id: id });
  return result;
};

const deleteProductFromDB = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};

// update
const updateProductInDB = async (
  _id: string,
  productData: Partial<TProduct>
) => {
  const updatedProduct = await Product.findByIdAndUpdate(_id, productData, {
    new: true,
    runValidators: true,
  }).exec();
  if (!updatedProduct) {
    throw new Error("Product not found");
  }
  return updatedProduct;
};

export const ProductServices = {
  createProductIntoDB,
  getProductsFromDB,
  getSingleProductFromDB,
  deleteProductFromDB,
  updateProductInDB,
};
