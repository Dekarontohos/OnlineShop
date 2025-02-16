import { getProducts } from "../api";

export const fetchProducts = async (
	sessions,
	page,
	limit,
	searchPhrase = "",
	searchCategory = null,
	sort = "",
) => {
	const { products, links } = await getProducts(
		page,
		limit,
		searchPhrase,
		searchCategory,
		sort,
	);

	return { error: null, response: { products, links } };
};
