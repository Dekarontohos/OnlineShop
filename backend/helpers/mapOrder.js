const mapProduct = require("./mapProduct");
const mapUser = require("./mapUser");
module.exports = function (order) {
  return {
    id: order.id,
    user: mapUser(order.user),
    orderTime: order.createdAt,
    totalAmount: order.totalAmount,
    totalQuantity: order.totalQuantity,
    products: order.products.map((item) => {
      return { ...mapProduct(item.product), quantity: item.quantity };
    }),
  };
};
