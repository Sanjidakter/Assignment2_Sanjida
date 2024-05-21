import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (ProductData: TProduct) => {
  if (await Product.isProductExists(ProductData.id)) {
    throw new Error('Product already exists!');
  }
  const result = await Product.create(ProductData);
  return result;
};

const getAllProductsFromDB = async () => {
  const result = await Product.find();
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await Product.aggregate([{ $match: { id } }]);
  return result;
};

const deleteProductFromDB = async (id: string) => {
  const result = await Product.updateOne({ id }, { $set: { isDeleted: true } });
  return result;
};;
// const deleteProductFromDB = async (id: string) => {
//   await Product.findByIdAndDelete(id);
// };


// update
const updateProductInDB = async (_id: string, productData: Partial<TProduct>) => {
  return await Product.updateOne({_id}, productData, { new: true, runValidators: true });
};

// search
const searchProductsInDB = async (searchTerm: string) => {
  const regex = new RegExp(searchTerm, 'i'); // Case-insensitive search
  return await Product.find({
    $or: [
      { name: { $regex: regex } },
      { description: { $regex: regex } },
      { category: { $regex: regex } },
      { tags: { $regex: regex } },
    ],
  });
};


export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  deleteProductFromDB,
  updateProductInDB,
  searchProductsInDB,
};