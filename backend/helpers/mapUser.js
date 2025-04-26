const mapProduct = require("./mapProduct");
module.exports = function (user) {
  return {
    id: user.id,
    login: user.login,
    roleId: user.role,
    basket: user.basket.map((item) => {
      return { ...mapProduct(item.product), quantity: item.quantity };
    }),
  };
};
