const express = require(`express`);
const {
  addProduct,
  editProduct,
  deleteProduct,
  getProduct,
  getProducts,
} = require(`../controllers/product`);
const mapProducts = require(`../helpers/mapProduct`);
const authticated = require(`../middlewares/authenticated`);
const hasRole = require(`../middlewares/hasRole`);
const ROLES = require(`../constants/roles`);

const router = express.Router({ mergeParams: true });

router.get(`/`, async (req, res) => {
  const { products, lastPage } = await getProducts(
    req.query.search,
    req.query.limit,
    req.query.page,
    req.query.categoryId,
    req.query.sort
  );

  res.send({ data: { lastPage, products: products.map(mapProducts) } });
});

router.get(`/:id`, async (req, res) => {
  const product = await getProduct(req.params.id);

  res.send({ data: mapProducts(product) });
});

router.post(`/`, authticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  const newProduct = await addProduct({
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    count: req.body.count,
    image_url: req.body.image_url,
  });

  res.send({ data: mapProducts(newProduct) });
});

router.patch(`/:id`, authticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  const updatedProduct = await editProduct(req.params.id, {
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    count: req.body.count,
    image_url: req.body.image_url,
  });

  res.send({ data: mapProducts(updatedProduct) });
});

router.delete(`/:id`, authticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  await deleteProduct(req.params.id);

  res.send({ error: null });
});

module.exports = router;
