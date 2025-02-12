export const getProducts = (page, limit) => {
	return fetch(`http://localhost:3005/products?_page=${page}&_limit=${limit}`)
		.then((loadedProducts) =>
			Promise.all([
				loadedProducts.json(),
				loadedProducts.headers.get("Link"),
			]),
		)
		.then(([loadedProducts, links]) => ({
			products: loadedProducts,
			links,
		}));
};
