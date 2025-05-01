import styled from "styled-components";
import { MAIN_BACKGROUND_SECOND_COLOR_THEME } from "../../../../constants";
import PropTypes from "prop-types";
import { formatNumber, getDateFromMongoose } from "../../../../utils";

const mainStyles = `
		font-size: 20px;
		font-weight: 600;
		padding: 10px;
		margin: auto 0;
		text-align: center;
		`;

const OrderTableRowContainer = ({
	className,
	id,
	user,
	totalAmount,
	totalQuantity,
	orderTime,
}) => {
	return (
		<div className={className}>
			<div className="id-column">{id}</div>
			<div className="user-column">{user.login}</div>
			<div className="amount-column">{formatNumber(totalAmount)}</div>
			<div className="quantity-column">{totalQuantity}</div>
			<div className="time-column">{getDateFromMongoose(orderTime)}</div>
		</div>
	);
};

export const OrderTableRow = styled(OrderTableRowContainer)`
	display: flex;
	padding: 10px;
	height: 120px;

	border-radius: 10px;
	background-color: ${MAIN_BACKGROUND_SECOND_COLOR_THEME};
	margin-bottom: 10px;
	width: 1000px;

	& .id-column {
		width: 300px;
		${mainStyles}
	}

	& .user-column {
		width: 200px;
		${mainStyles}
	}

	& .amount-column {
		width: 150px;
		${mainStyles}
	}

	& .quantity-column {
		width: 150px;
		${mainStyles}
	}

	& .time-column {
		width: 150px;
		${mainStyles}
	}
`;

OrderTableRow.propTypesropTypes = {
	id: PropTypes.string.isRequired,
	user: PropTypes.object.isRequired,
	totalAmount: PropTypes.number.isRequired,
	totalQuantity: PropTypes.number.isRequired,
	orderTime: PropTypes.string.isRequired,
};
