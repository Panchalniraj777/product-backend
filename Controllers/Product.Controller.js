const ProductModel = new (require("../Models/Product.Models"))();

const { STATUS_CODES } = require("../Configs/constants");

module.exports = class ProjectAuthController {
  addProduct = async (req, res) => {
    try {
      let {
        name,
        description,
        main_price,
        discounted_price,
        combo_price,
        combo_products,
      } = req.body;

      const image = req.file.filename;

      combo_products = JSON.parse(combo_products);
      const isProductExist = await ProductModel.getProduct(
        {
          name,
        },
        {},
        {
          lean: true,
        }
      );

      if (isProductExist?._id) {
        return res.status(STATUS_CODES.NOT_ALLOWED).send({
          message: "PRODUCT_EXIST",
        });
      }

      const response = await ProductModel.addProduct(
        name,
        description,
        main_price,
        discounted_price,
        combo_price,
        image,
        combo_products
      );

      await response.save();

      return res.status(STATUS_CODES.SUCCESS).send({
        data: response,
      });
    } catch (error) {
      console.log(error);
      return res.status(STATUS_CODES.SERVER_ERROR).send({
        message: "Something went wrong",
      });
    }
  };

  getProductList = async (req, res) => {
    try {
      const productList = await ProductModel.getProductList();
      return res.status(STATUS_CODES.SUCCESS).send({
        data: productList,
      });
    } catch (error) {
      console.log(error);
      return res.status(STATUS_CODES.SERVER_ERROR).send({
        message: "Something went wrong",
      });
    }
  };
};
