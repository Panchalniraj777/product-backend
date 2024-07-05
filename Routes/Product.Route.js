const express = require("express");
const router = express.Router();

const ProductController = new (require("../Controllers/Product.Controller"))();
const upload = require("../Configs/multer");

router
  .route("/")
  .post(upload.single("image"), ProductController.addProduct)
  .get(ProductController.getProductList);

module.exports = router;
