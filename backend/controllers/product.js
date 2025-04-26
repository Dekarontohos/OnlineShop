const Product = require(`../models/Product`);

async function addProduct(product) {
  const newProduct = await Product.create(product);

  await newProduct.populate("category");

  return newProduct;
}

async function editProduct(id, product) {
  const newProduct = await Product.findByIdAndUpdate(id, product, {
    returnDocument: "after",
  });

  return await newProduct.populate("category");
}

function deleteProduct(id) {
  return Product.deleteOne({ _id: id });
}

async function getProduct(id) {
  return await Product.findById(id).populate("category");
}

// async function getProducts(search = "", limit = 10, page = 1, categoryId = null, sort = "") {
//   const [products, count] = await Promise.all([
//     Product.find({ name: { $regex: search, $options: "i" } })
//       .limit(limit)
//       .skip((page - 1) * limit)
//       // .sort({ createdAt: -1 })
//       .sort({ createdAt: -1 })
//       .populate("category"),
//     Product.countDocuments({ name: { $regex: search, $options: "i" } }),
//   ]);

//   return { products, lastPage: Math.ceil(count / limit) };
// }

async function getProducts(
  search = "",
  limit = 10,
  page = 1,
  categoryId = null,
  sort = ""
) {
  const filter = {
    name: { $regex: search, $options: "i" },
  };

  if (categoryId) {
    filter.category = categoryId;
  }

  let sortOptions;
  if (sort === "asc") {
    sortOptions = { price: 1 };
  } else if (sort === "desc") {
    sortOptions = { price: -1 };
  } else {
    sortOptions = { id: -1 };
  }

  const [products, count] = await Promise.all([
    Product.find(filter)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort(sortOptions)
      .populate("category"),
    Product.countDocuments(filter),
  ]);

  return { products, lastPage: Math.ceil(count / limit) };
}

// async function getProducts(search = "", limit = 10, page = 1) {
//   const [products, count] = await Promise.all([
//     Product.find(),
//     Product.countDocuments(),
//   ]);

//   return { products, lastPage: Math.ceil(count / limit) };
// }

module.exports = {
  addProduct,
  editProduct,
  deleteProduct,
  getProduct,
  getProducts,
};
