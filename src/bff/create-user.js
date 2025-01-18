export const createUser = (login, password) => {
	fetch("http://localhost:3005/users", {
		method: "post",
		headers: { "Content-Type": "application/json;charset=utf-8" },
		body: JSON.stringify({
			login,
			password,
			role: 1,
		}),
	});
};
