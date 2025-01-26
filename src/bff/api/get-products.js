export const getProducts = () =>
	fetch("http://localhost:3005/products").then((loadedProducts) =>
		loadedProducts.json(),
	);
