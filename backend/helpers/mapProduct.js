const mapCategory = require("./mapCategory");

module.exports = function (product) {
  return {
    id: product.id,
    name: product.name,
    category: mapCategory(product.category),
    price: product.price,
    count: product.count,
    image_url: product.image_url,
  };
};
