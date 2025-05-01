const Order = require(`../models/Order`);

async function getOrders(search = "", limit = 10, page = 1) {
  const [orders, count] = await Promise.all([
    Order.find()
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 })
      .populate("user")
      .populate("products.product")
      .populate({ path: "products.product", populate: "category" }),
    Order.countDocuments(),
  ]);

  return { orders, lastPage: Math.ceil(count / limit) };
}

async function getOrder(id) {
  const order = await Order.findById(id);
  //await order.populate("products");
  return order;
}

function createOrder(orderData) {
  return Order.create(orderData);
}

module.exports = { getOrder, createOrder, getOrders };
