export const getProducts = (page, limit) => {
	return fetch(
		`http://localhost:3005/products?_page=${page}&_per_page=${limit}`,
	).then((loadedProducts) => loadedProducts.json());
};
