import styled from "styled-components";
import { Icon } from "../icon/icon";

const SortArrowContainer = ({ className, sort }) => {
	return (
		<Icon
			className={className}
			id={
				sort === "+"
					? "fa-caret-up"
					: "Example of caret-down fa-caret-down"
			}
			margin="0 0 0 10px"
			size="26px"
			style={{ visibility: sort === "" ? "hidden" : "visible" }}
		></Icon>
	);
};

export const SortArrow = styled(SortArrowContainer)``;
