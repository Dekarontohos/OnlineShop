import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setProductInBasket } from "../../../../../../actions";
import { MAIN_BLACK_ELEMENT_HOVER_THEME } from "../../../../../../constants";

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

const QuantityChanger = ({ product, initialQuantity }) => {
	const dispatch = useDispatch();

	const handleIncrease = () => {
		dispatch(setProductInBasket(product, false));
	};

	const handleDecrease = () => {
		if (initialQuantity > 1) {
			dispatch(setProductInBasket(product, true));
		}
	};

	return (
		<QuantityContainer>
			<Button onClick={handleDecrease}>−</Button>
			<QuantityDisplay>{initialQuantity}</QuantityDisplay>
			<Button onClick={handleIncrease}>+</Button>
		</QuantityContainer>
	);
};

export default QuantityChanger;
