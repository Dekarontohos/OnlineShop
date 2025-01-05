import React from "react";
import "./App.css";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";

const Content = styled.div`
	padding: 120px 0 0 0;
`;

const H2 = styled.h2`
	text-align: center;
`;
const Header = () => <div>Шапка</div>;

export const OnlineShop = () => {
	return (
		// <div>
		// 	<i className="fa fa-camera-retro"></i>
		// 	123
		// 	<Div>123</Div>
		// </div>
		<div>
			<Header></Header>
			<Content>
				<H2>Контент страницы</H2>
				<Routes>
					<Route path="/" element={<div>Главная страницы</div>} />
					<Route path="/login" element={<div>Авторизация</div>} />
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
		</div>
	);
};
