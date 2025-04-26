import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Error } from "../error/error";
import { selectUserRole } from "../../Redux/selectors";
import { ERROR, PROP_TYPE } from "../../constants";
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

PrivateContent.propTypesropTypes = {
	children: PropTypes.string.isRequired,
	access: PropTypes.arrayOf(PROP_TYPE.ROLE).isRequired,
	serverError: PROP_TYPE.ERROR,
};
