import { getCategories } from "../api";

export const fetchCategories = async () => {
	const categories = await getCategories();

	return { error: null, response: categories };
};
