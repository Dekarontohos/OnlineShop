module.exports = function (product) {
  return {
    id: product.id,
    name: product.name,
    category: { name: product.category.name, id: product.category.id },
    price: product.price,
    count: product.count,
    image_url: product.image_url,
  };
};
