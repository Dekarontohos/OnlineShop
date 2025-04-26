const express = require(`express`);
const { addCategory, getCategories } = require(`../controllers/category`);
const authticated = require(`../middlewares/authenticated`);
const hasRole = require(`../middlewares/hasRole`);
const ROLES = require(`../constants/roles`);
const mapCategories = require("../helpers/mapCategory");

const router = express.Router({ mergeParams: true });

router.get(`/`, async (req, res) => {
  const categories = await getCategories();
  res.send({ data: categories.map(mapCategories) });
});

router.post(`/`, authticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  const newCategory = await addCategory({
    name: req.body.name,
  });
  res.send({ data: newCategory });
});

module.exports = router;
