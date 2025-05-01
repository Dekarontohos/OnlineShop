import styled from "styled-components";
import { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../../../components";
import { MAIN_BACKGROUND_SECOND_COLOR_THEME } from "../../../../../constants";
import {
	selectTotalBasketQuantity,
	selectTotalBasketPrice,
	selectUserId,
} from "../../../../../Redux/selectors";
import { cleareBasket } from "../../../../../actions";
import PropTypes from "prop-types";
import { request } from "../../../../../utils/request";

const StyledLabel1 = styled.div`
	font-size: 26px;
	font-weight: 500;
`;

const StyledLabel2 = styled.div`
	font-size: 22px;
	font-weight: 400;
`;

const FunctionalPanelContainer = forwardRef(
	({ className, productsInBasket, setLoading }, ref) => {
		const userId = useSelector(selectUserId);
		const dispatch = useDispatch();

		// const createOrder = () => {
		// 	setLoading(true);
		// 	const orderData = {
		// 		user: userId,
		// 		orderTime: new Date().toISOString(),
		// 		totalAmount: totalSum,
		// 		totalQuantity: totalQuantity,
		// 	};

		// 	const newProductsInBasket = productsInBasket.map(
		// 		({ id, ...rest }) => ({ ...rest, product_id: id }),
		// 	);

		// 	const orderItemsData = newProductsInBasket;
		// 	requestServer("addOrder", { orderData, orderItemsData })
		// 		.then((result) => {
		// 			setLoading(false);
		// 			if (result.response === "success") {
		// 				dispatch(cleareBasket());
		// 				alert("Заказ создан.");
		// 			} else {
		// 				alert(result.error);
		// 			}
		// 		})
		// 		.catch(() => {
		// 			setLoading(false);
		// 		});
		// };

		const createOrder = () => {
			if (!sessionStorage.getItem("userData")) {
				alert("Необходимо авторизоваться.");
			}
			setLoading(true);
			const orderData = {
				user: userId,
				totalAmount: totalSum,
				totalQuantity: totalQuantity,
				products: productsInBasket.map((product) => {
					return { quantity: product.quantity, product: product.id };
				}),
			};
			request(`/orders`, "POST", orderData)
				.then((result) => {
					setLoading(false);
					dispatch(cleareBasket());
					alert("Заказ создан.");
				})
				.catch(() => {
					setLoading(false);
				});
		};

		function getProductDeclension(count) {
			const lastDigit = count % 10;
			const lastTwoDigits = count % 100;

			if (lastDigit === 1 && lastTwoDigits !== 11) {
				return `${count} товар`;
			} else if (
				lastDigit >= 2 &&
				lastDigit <= 4 &&
				(lastTwoDigits < 12 || lastTwoDigits > 14)
			) {
				return `${count} товара`;
			} else {
				return `${count} товаров`;
			}
		}

		const totalSum = useSelector(selectTotalBasketPrice);
		const totalQuantity = useSelector(selectTotalBasketQuantity);

		return (
			<div className={className} ref={ref}>
				<StyledLabel1>Итого:</StyledLabel1>
				<StyledLabel2>
					{getProductDeclension(totalQuantity)}
					&nbsp; на сумму <br />
					{totalSum.toLocaleString("ru-RU", {})}
					&nbsp; рублей.
				</StyledLabel2>
				<Button
					width={"200px;"}
					fontSize={"20px;"}
					height={"50px;"}
					margin={"auto 0"}
					disabled={!totalQuantity}
					onClick={() => {
						createOrder();
					}}
				>
					<span>Оформить заказ</span>
				</Button>
			</div>
		);
	},
);

export const FunctionalPanel = styled(FunctionalPanelContainer)`
	border-radius: 5px;
	padding: 10px;
	border: 2px solid #000;
	height: 300px;
	width: 350px;
	align-items: center;
	flex-direction: column;
	display: flex;
	text-align: center;
	background-color: ${MAIN_BACKGROUND_SECOND_COLOR_THEME};
`;

FunctionalPanel.propTypes = {
	productsInBasket: PropTypes.array,
};
