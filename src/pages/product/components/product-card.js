import styled from "styled-components";
import { Button } from "../../../components";
import { useDispatch } from "react-redux";
import { setProductInBusket } from "../../../actions";
import { MAIN_BACKGROUND_SECOND_COLOR_THEME } from "../../../constants";

export const ProductCardContainer = ({ className, product }) => {
	const dispatch = useDispatch();

	const buyOnClick = (product) => {
		dispatch(setProductInBusket(product, false));
	};

	return (
		<div className={className}>
			<div
				style={{
					display: "flex",
				}}
			>
				<img
					src={product.image_url}
					alt={`image_${product.id}`}
					width={"400"}
					height={"400"}
				/>
				<div
					style={{
						textAlign: "left",
						display: "flex",
						flexDirection: "column",
					}}
				>
					<label
						style={{
							fontSize: "24px",
							margin: "20px",
						}}
					>
						<strong style={{ fontWeight: "500" }}>
							Наименование:{" "}
						</strong>
						{product.name} <br />
					</label>
					<label
						style={{
							fontSize: "24px",
							margin: "20px",
						}}
					>
						<strong style={{ fontWeight: "500" }}>
							Количество:{" "}
						</strong>
						{product.count} <br />
					</label>
					<label
						style={{
							fontSize: "24px",
							margin: "20px",
						}}
					>
						<strong style={{ fontWeight: "500" }}>
							Стоимость:{" "}
						</strong>
						{product.price} <br />
					</label>
				</div>
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					textAlign: "right",
				}}
			>
				<Button
					width={"200px;"}
					fontSize={"20px;"}
					height={"50px;"}
					margin={"auto 0"}
					onClick={() => {
						buyOnClick(product);
					}}
				>
					<span>Купить</span>
				</Button>
				<label
					style={{
						fontSize: "20px",
					}}
				>
					<strong style={{ fontWeight: "500" }}>id товара: </strong>
					{product.id}
				</label>
			</div>
		</div>
	);
};

export const ProductCard = styled(ProductCardContainer)`
	display: flex;
	border-radius: 5px;
	padding: 40px;
	border: 2px solid #000;
	background-color: ${MAIN_BACKGROUND_SECOND_COLOR_THEME};
	width: 1500px;
	text-align: center;
	justify-content: space-between;
`;
