export const getProducts = (
	page,
	limit,
	searchPhrase,
	searchCategory,
	sort,
) => {
	return fetch(
		`http://localhost:3005/products?${sort === "+" ? `_sort=price&_order=asc&` : sort === "-" ? `_sort=price&_order=desc&` : ""}${searchCategory ? `category=${searchCategory}&` : ""}name_like=${searchPhrase}&_page=${page}&_limit=${limit}`,
	)
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
