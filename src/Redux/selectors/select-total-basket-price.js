export const selectTotalBasketPrice = (state) => {
	return state.productsInBasket.reduce((total, product) => {
		return total + product.price * product.quantity;
	}, 0);
};
