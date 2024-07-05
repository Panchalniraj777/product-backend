const ProductSchema = require("../Database/Schemas/ProductSchema");

module.exports = class ProjectAuthModel {
  getProduct = (filter = {}, projection = {}, options = {}) => {
    return ProductSchema.findOne(filter, projection, options);
  };

  getProductList = (filter = {}, projection = {}, options = {}) => {
    return ProductSchema.find(filter, projection, options).populate(
      "combo_products.product",
      "name description main_price discounted_price combo_price image"
    );
  };

  addProduct = (
    name,
    description,
    main_price,
    discounted_price,
    combo_price,
    image,
    combo_products
  ) => {
    return new ProductSchema({
      name,
      description,
      main_price,
      discounted_price,
      combo_price,
      image,
      combo_products,
    });
  };

  productBulkWrite = async (updates) => {
    return ProductSchema.bulkWrite(updates);
  };
};
