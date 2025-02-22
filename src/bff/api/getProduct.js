export const getProduct = (productId) =>
	fetch(`http://localhost:3005/products/${productId}`).then((loadedProduct) =>
		loadedProduct.json(),
	);
