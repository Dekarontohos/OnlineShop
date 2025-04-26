import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setProductInBasket } from "../../../../../../actions";
import { MAIN_BLACK_ELEMENT_HOVER_THEME } from "../../../../../../constants";
import PropTypes from "prop-types";
import { deleteProductInBasket } from "../../../../../../actions/delete-product-in-basket";

const QuantityContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Button = styled.button`
	background-color: transparent;
	border: none;
	cursor: pointer;
	font-size: 20px;

	&:hover {
		color: ${MAIN_BLACK_ELEMENT_HOVER_THEME};
	}
`;

const QuantityDisplay = styled.span`
	margin: 0 10px;
	font-size: 18px;
	font-weight: bold;
`;

const QuantityChanger = ({ className, product, initialQuantity }) => {
	const dispatch = useDispatch();

	const handleIncrease = () => {
		dispatch(setProductInBasket(product, false));
	};

	const handleDecrease = () => {
		if (initialQuantity > 1) {
			dispatch(setProductInBasket(product, true));
		} else {
			dispatch(deleteProductInBasket(product.id));
		}
	};

	return (
		<QuantityContainer className={className}>
			<Button onClick={handleDecrease} className="minus">
				-
			</Button>
			<QuantityDisplay>{initialQuantity} </QuantityDisplay>
			<Button onClick={handleIncrease} className="plus">
				+
			</Button>
		</QuantityContainer>
	);
};

export default QuantityChanger;

QuantityChanger.propTypesropTypes = {
	product: PropTypes.object.isRequired,
	initialQuantity: PropTypes.number.isRequired,
};
