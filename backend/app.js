require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const routes = require("./routes");

const port = 3001;
const app = express();

app.use(express.static("../frontend/build"));

app.use(cookieParser());
app.use(express.json());

app.use("/", routes);

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
});

// const express = require(`express`);
// const mongoose = require(`mongoose`);
// const cookieParser = require(`cookie-parser`);
// const { register, login } = require(`./controllers/user`);
// const {
//   addProduct,
//   editProduct,
//   deleteProduct,
//   getProduct,
//   getProducts,
// } = require(`./controllers/product`);
// const mapUser = require("./helpers/mapUser");
// const mapProducts = require(`./helpers/mapProduct`);
// const authticated = require(`./middlewares/authenticated`);
// const hasRole = require(`./middlewares/hasRole`);
// const ROLES = require(`./constants/roles`);

// const port = 3001;
// const app = express();

// app.use(cookieParser());
// app.use(express.json());

// app.post(`/register`, async (req, res) => {
//   try {
//     const { user, token } = await register(req.body.login, req.body.password);

//     res
//       .cookie(`token`, token, { httpOnly: true })
//       .send({ error: null, user: mapUser(user) });
//   } catch (e) {
//     res.send({ error: e.message || `Unknown error` });
//   }
// });

// app.post(`/login`, async (req, res) => {
//   try {
//     const { user, token } = await login(req.body.login, req.body.password);

//     res
//       .cookie(`token`, token, { httpOnly: true })
//       .send({ error: null, user: mapUser(user) });
//   } catch (e) {
//     res.send({ error: e.message || `Unknown error` });
//   }
// });

// app.post(`/logout`, (req, res) => {
//   res.cookie(`token`, ``, { httpOnly: true }).send({});
// });

// app.get(`/products`, async (req, res) => {
//   const { products, lastPage } = await getProducts(
//     req.query.search,
//     req.query.limit,
//     req.query.page
//   );

//   res.send({ data: { lastPage, products: products.map(mapProducts) } });
// });

// app.get(`/product/:id`, async (req, res) => {
//   const product = await getProduct(req.params.id);

//   res.send({ data: mapProducts(product) });
// });

// app.use(authticated);

// app.post(`/products`, hasRole([ROLES.ADMIN]), async (req, res) => {
//   const newProduct = await addProduct({
//     name: req.body.name,
//     category: req.body.category,
//     price: req.body.price,
//     count: req.body.count,
//     image_url: req.body.image_url,
//   });

//   res.send({ data: mapProducts(newProduct) });
// });

// app.patch(`/products/:id`, hasRole([ROLES.ADMIN]), async (req, res) => {
//   const updatedProduct = await editProduct(req.params.id, {
//     name: req.body.name,
//     category: req.body.category,
//     price: req.body.price,
//     count: req.body.count,
//     image_url: req.body.image_url,
//   });

//   res.send({ data: mapProducts(updatedProduct) });
// });

// app.delete(`/products/:id`, hasRole([ROLES.ADMIN]), async (req, res) => {
//   await deleteProduct(req.params.id);

//   res.send({ error: null });
// });

// // app.get(`/users`, hasRole([ROLES.ADMIN]), async (req, res) => {

// //     const users = await getUsers();

// //     res.send({ data: users });
// // });

// // app.get(`/users/roles`, hasRole([ROLES.ADMIN]), async (req, res) => {
// //   const roles = getRoles();
// //   res.send({ data: roles });
// // });

// mongoose.connect(`mongodb://user:mongopass@localhost:27017/`).then(() => {
//   app.listen(port, () => {
//     console.log(`Server started on port ${port}`);
//   });
// });
