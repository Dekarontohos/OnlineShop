import styled from "styled-components";
import { MAIN_BACKGROUND_SECOND_COLOR_THEME } from "../../../../constants";

export const TableRowContainer = ({ className, children }) => (
	<div className={className}>{children}</div>
);

const mainStyles = `
		text-align: center;
		font-size: 20px;
		font-weight: 600;
		`;

export const TableRow = styled(TableRowContainer)`
	display: flex;
	border-radius: 5px;
	padding: 10px;
	border: 2px solid #000;
	background-color: ${MAIN_BACKGROUND_SECOND_COLOR_THEME};
	margin-bottom: 10px;

	& .id-column {
		width: 80px;
		${mainStyles}
	}

	& .name-column {
		width: 200px;
		${mainStyles}
	}

	& .category-column {
		width: 200px;
		${mainStyles}
	}

	& .price-column {
		width: 150px;
		${mainStyles}
	}

	& .count-column {
		width: 150px;
		${mainStyles}
	}

	& .image-column {
		width: 100px;
		${mainStyles}
	}
	& .actions-column {
		width: 100px;
		${mainStyles}
	}
`;
