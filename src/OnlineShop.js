import React from "react";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components";
import { Authorization, ProductsManagment, Registration } from "./pages";
import "./App.css";

const Page = styled.div`
	padding: 120px 0 0 0;
`;

const AppColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	min-height: 100%;
	background-color: #fff;
	margin: 0 auto;
`;

export const OnlineShop = () => {
	return (
		<AppColumn>
			<Header></Header>
			<Page>
				<Routes>
					<Route path="/" element={<div>Главная страницы</div>} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route
						path="/products/:productId"
						element={<div>Продукт</div>}
					/>
					<Route path="/basket" element={<div>Корзина</div>} />
					<Route
						path="/productsManagment"
						element={<ProductsManagment />}
					/>
					<Route path="*" element={<div>Ошибка</div>} />
				</Routes>
			</Page>
		</AppColumn>
	);
};
