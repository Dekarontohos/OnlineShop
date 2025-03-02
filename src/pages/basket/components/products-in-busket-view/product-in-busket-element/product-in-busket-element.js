import styled from "styled-components";
import { Icon } from "../../../../../components";
import { useDispatch } from "react-redux";
import { deleteProductInBusket } from "../../../../../actions/delete-product-in-busket";
import QuantityChanger from "./quantity-changer/quantity-changer";
import { MAIN_BACKGROUND_SECOND_COLOR_THEME } from "../../../../../constants";

const StyledDiv = styled.div`
	text-align: left;
	display: flex;
	margin-bottom: 10px;
`;

const ProductInBusketElementContainer = ({ className, product }) => {
	const dispatch = useDispatch();

	const deleteFromBusketOnClick = (id) => {
		dispatch(deleteProductInBusket(id));
	};

	return (
		<div className={className}>
			<img
				src={product.image_url}
				alt={`image_${product.id}`}
				width={"150"}
				height={"150"}
			/>
			<div style={{ margin: "0 0 0 10px" }}>
				<StyledDiv>
					<label style={{ paddingRight: "10px", fontWeight: "500" }}>
						id товара:
					</label>
					<label>{product.id}</label>
				</StyledDiv>
				<StyledDiv>
					<label style={{ paddingRight: "10px", fontWeight: "500" }}>
						Наименование:
					</label>
					<label>{product.name}</label>
				</StyledDiv>
				<StyledDiv>
					<label style={{ paddingRight: "10px", fontWeight: "500" }}>
						Количество:
					</label>
					<QuantityChanger
						product={product}
						initialQuantity={product.quantity}
					></QuantityChanger>
				</StyledDiv>
				<StyledDiv>
					<label style={{ paddingRight: "10px", fontWeight: "500" }}>
						Стоимость:
					</label>
					<label>{product.price}</label>
				</StyledDiv>
			</div>
			<Icon
				id="fa-times-circle"
				size="26px"
				color="#ff4d4dc9"
				colorhover="#ff1a1a" //в нижнем регистре
				position="absolute"
				top="10px"
				right="30px"
				onClick={() => deleteFromBusketOnClick(product.id)}
			></Icon>
		</div>
	);
};

export const ProductInBusketElement = styled(ProductInBusketElementContainer)`
	display: flex;
	padding: 10px;
	position: relative;
	align-items: center;
	width: 800px;
	height 170px;

	border-radius: 10px;
	background-color: ${MAIN_BACKGROUND_SECOND_COLOR_THEME};
	margin-bottom: 10px;
`;
