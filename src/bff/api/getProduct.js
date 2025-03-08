export const getProduct = (productId) =>
	fetch(`http://localhost:3005/products/${productId}`)
		.then((response) => {
			if (response.ok) {
				return response;
			}

			const error =
				response.status === 404
					? `Такая страница не существует.`
					: "Что-то пошло не так. Попробуйте ещё раз позднее.";

			return Promise.reject(error);
		})
		.then((loadedProduct) => loadedProduct.json());
