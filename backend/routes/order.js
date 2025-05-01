const express = require(`express`);
const { getOrder, createOrder, getOrders } = require(`../controllers/order`);
const mapOrder = require("../helpers/mapOrder");
const authticated = require(`../middlewares/authenticated`);
const router = express.Router({ mergeParams: true });

router.get(`/`, async (req, res) => {
  const { orders, lastPage } = await getOrders(
    "",
    req.query.limit,
    req.query.page
  );

  res.send({ data: { lastPage, orders: orders.map(mapOrder) } });
});

router.get(`/:id`, authticated, async (req, res) => {
  const order = await getOrder(req.params.id);
  await order.populate("products.product");
  await order.populate("user");
  // await order.populate({ path: "products", populate: "product" });
  await order.populate({ path: "products.product", populate: "category" });

  res.send({ data: mapOrder(order) });
});

router.post(`/`, authticated, async (req, res) => {
  const createdOrder = await createOrder({
    user: req.body.user,
    totalAmount: req.body.totalAmount,
    totalQuantity: req.body.totalQuantity,
    products: req.body.products,
  });

  await createdOrder.populate("products.product");
  await createdOrder.populate({
    path: "products.product",
    populate: "category",
  });

  res.send({ data: mapOrder(createdOrder) });
});

module.exports = router;
