const Category = require(`../models/Category`);

function addCategory(category) {
  return Category.create(category);
}

async function getCategories() {
  return await Category.find();
}

module.exports = {
  addCategory,
  getCategories,
};
