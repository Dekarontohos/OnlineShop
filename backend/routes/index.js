const express = require("express");

const router = express.Router({ mergeParams: true });

router.use("/", require("./auth"));
router.use("/products", require("./product"));
router.use("/categories", require("./category"));
router.use("/users", require("./user"));
router.use("/orders", require("./order"));

module.exports = router;
