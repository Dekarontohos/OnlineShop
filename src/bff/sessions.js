import { createSession, deleteSession, getSession } from "./api";

export const sessions = {
	create(user) {
		const hash = Math.random().toFixed(50);

		createSession(hash, user);

		return hash;
	},
	async remove(hash) {
		const session = await getSession(hash);

		if (!session) {
			return;
		}

		deleteSession(session.id);
	},
	async access(hash, accessRoles) {
		const session = await getSession(hash);
		console.log(hash, accessRoles, session);
		return !!session.user && accessRoles.includes(session.user.roleId);
	},
};
