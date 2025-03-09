import styled from "styled-components";
import { Button } from "../../../../../components";
import { useNavigate } from "react-router-dom";
import { MAIN_BACKGROUND_SECOND_COLOR_THEME } from "../../../../../constants";
import PropTypes from "prop-types";

const StyledDiv = styled.div`
	display: flex;
	justify-content: left;
	width: 250px;
`;

const ProductElementContainer = ({ className, id, name, price, image_url }) => {
	const navigate = useNavigate();

	return (
		<div className={className}>
			<img
				src={image_url}
				alt={`image_${id}`}
				width={"150"}
				height={"150"}
			/>
			<div style={{ margin: "0 0 0 10px" }}>
				<StyledDiv>
					<label
						style={{
							fontSize: "20px",
							fontWeight: "600",
							paddingRight: "10px",
							margin: "0 0 10px 0",
						}}
					>
						{name}
					</label>
				</StyledDiv>
				<StyledDiv>
					<label style={{ paddingRight: "10px" }}>id товара: </label>
					<label>{id}</label>
				</StyledDiv>
				<StyledDiv>
					<label style={{ paddingRight: "10px" }}>Стоимость: </label>
					<label>{price}</label>
				</StyledDiv>
			</div>
			<Button
				width={"150px"}
				fontSize={"16px"}
				height={"50px"}
				onClick={() => {
					navigate(`products/${id}`);
				}}
				margin={"0 20px 0 0"}
			>
				<span>Открыть карточку</span>
			</Button>
		</div>
	);
};

export const ProductElement = styled(ProductElementContainer)`
	display: flex;
	padding: 10px;
	justify-content: space-between;
	align-items: center;
	width: 800px;

	border-radius: 10px;
	background-color: ${MAIN_BACKGROUND_SECOND_COLOR_THEME};
	margin-bottom: 10px;
`;

ProductElement.propTypesropTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	price: PropTypes.string.isRequired,
	image_url: PropTypes.string.isRequired,
};
