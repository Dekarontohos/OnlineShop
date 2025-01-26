export const updateProduct = (productData) =>
	fetch(`http://localhost:3005/products/${productData.id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json;charset=utf-8" },
		body: JSON.stringify(productData),
	}).then((updatedProduct) => updatedProduct.json());
