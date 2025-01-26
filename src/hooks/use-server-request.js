import { server } from "../bff";
import { useSelector } from "react-redux";
import { selectUserSession } from "../Redux/selectors";
import { useCallback } from "react";

export const useServerRequest = () => {
	const session = useSelector(selectUserSession);

	return useCallback(
		(operation, ...params) => {
			const request = ["register", "autorize"].includes(operation)
				? [params]
				: [session, ...params];
			return server[operation](...request);
		},
		[session],
	);
};
