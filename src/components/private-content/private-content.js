import { useSelector } from "react-redux";
import { Error } from "../error/error";
import { selectUserRole } from "../../Redux/selectors";
import { ERROR } from "../../constants";
import { checkAccess } from "../../utils";

export const PrivateContent = ({
	children,
	access = null,
	serverError = null,
}) => {
	const userRole = useSelector(selectUserRole);

	let accessError;
	if (access != null) {
		accessError = checkAccess(access, userRole)
			? null
			: ERROR.ACCESS_DENIED;
	}

	const error = serverError || accessError;

	return error ? <Error error={error}></Error> : children;
};
