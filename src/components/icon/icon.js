import PropTypes from "prop-types";
import styled from "styled-components";
import { MAIN_BLACK_ELEMENT_HOVER_THEME } from "../../constants";

const IconContainer = ({ className, id, ...props }) => (
	<div className={className} {...props}>
		<i className={`fa ${id}`} aria-hidden="true"></i>
	</div>
);

export const Icon = styled(IconContainer)`
	font-size: ${({ size = "24px" }) => size};
	margin: ${({ margin = "0" }) => margin};
	color: ${({ color = "black" }) => color};
	position: ${({ position = "" }) => position};
	top: ${({ top = "" }) => top};
	right: ${({ right = "" }) => right};
	transition:
		transform 0.3s ease,
		color 0.3s ease;
	&:hover {
		color: ${({ colorhover = MAIN_BLACK_ELEMENT_HOVER_THEME }) =>
			colorhover}; //в нижнем регистре
		cursor: pointer;
	}
`;

Icon.propTypesropTypes = {
	id: PropTypes.string.isRequired,
};
