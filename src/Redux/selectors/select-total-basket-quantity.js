export const selectTotalBasketQuantity = (state) => {
	return state.productsInBasket.reduce((total, product) => {
		return total + product.quantity;
	}, 0);
};
