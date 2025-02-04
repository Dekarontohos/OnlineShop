export const addSession = (hash,userId) => {
    fetch("http://localhost:3005/sessions", {
		method: "POST",
		headers: { "Content-Type": "application/json;charset=utf-8" },
		body: JSON.stringify({
            
        }),
	}).then((createdProduct) => createdProduct.json());
}