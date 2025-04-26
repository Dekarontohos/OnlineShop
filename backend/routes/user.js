const express = require(`express`);
const { getUser, updateUser } = require(`../controllers/user`);
const mapUser = require(`../helpers/mapUser`);
const mapProduct = require("../helpers/mapProduct");
const authticated = require(`../middlewares/authenticated`);

const router = express.Router({ mergeParams: true });

router.get(`/:id/basket`, authticated, async (req, res) => {
  const user = await getUser(req.params.id);

  await user.populate("basket.product");
  await user.populate({ path: "basket.product", populate: "category" });

  res.send({
    data: user.basket.map((item) => {
      return { product: mapProduct(item.product), quantity: item.quantity };
    }),
  });
});

router.patch(`/:id/basket`, authticated, async (req, res) => {
  const updatedUser = await updateUser(req.params.id, {
    basket: req.body.basket,
  });

  await updatedUser.populate("basket.product");
  await updatedUser.populate({ path: "basket.product", populate: "category" });

  res.send({
    data: updatedUser.basket.map((item) => {
      return { ...mapProduct(item.product), quantity: item.quantity };
    }),
  });
});

module.exports = router;
