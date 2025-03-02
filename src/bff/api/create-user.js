export const createUser = (login, password) =>
	fetch("http://localhost:3005/users", {
		method: "POST",
		headers: { "Content-Type": "application/json;charset=utf-8" },
		body: JSON.stringify({
			login,
			password,
			roleId: 1,
		}),
	}).then((createdUser) => createdUser.json());
