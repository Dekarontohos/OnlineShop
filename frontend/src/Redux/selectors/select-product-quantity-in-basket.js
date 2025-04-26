export const selectProductQuantityInBasket = (state, productId) => {
	const resultproduct = state.productsInBasket.find(
		(product) => product.id === productId,
	);
	return resultproduct ? resultproduct.quantity : 0;
};
