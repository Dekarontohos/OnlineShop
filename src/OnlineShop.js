import React from "react";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components";
import { Authorization } from "./pages";
import "./App.css";

const Content = styled.div`
	padding: 120px 0;
`;

const AppColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 1200px;
	min-height: 100%;
	background-color: #fff;
	margin: 0 auto;
`;

const Footer = () => <div>Футер</div>;

export const OnlineShop = () => {
	return (
		// <div>
		// 	<i className="fa fa-camera-retro"></i>
		// 	123
		// 	<Div>123</Div>
		// </div>
		<AppColumn>
			<Header></Header>
			<Content>
				<Routes>
					<Route path="/" element={<div>Главная страницы</div>} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<div>Регистрация</div>} />
					<Route
						path="/products/:productId"
						element={<div>Продукт</div>}
					/>
					<Route path="/basket" element={<div>Корзина</div>} />
					<Route
						path="/productsManagment"
						element={<div>Управление продуктами</div>}
					/>
					<Route path="*" element={<div>Ошибка</div>} />
				</Routes>
			</Content>
			<Footer></Footer>
		</AppColumn>
	);
};
