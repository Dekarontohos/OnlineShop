const mapProduct = require("./mapProduct");
module.exports = function (user, needBusket = false) {
  return {
    id: user.id,
    login: user.login,
    roleId: user.role,
    basket: needBusket
      ? user.basket.map((item) => {
          return { ...mapProduct(item.product), quantity: item.quantity };
        })
      : [],
  };
};
