import React, { useLayoutEffect } from "react";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import { Header, Modal } from "./components";
import {
	Authorization,
	ProductsManagment,
	Registration,
	ProductsList,
	Product,
} from "./pages";
import "./App.css";
import { setUser } from "./actions";
import { useDispatch } from "react-redux";

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
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem("userData");

		if (!currentUserDataJSON) {
			return;
		}

		const currentUserData = JSON.parse(currentUserDataJSON);

		dispatch(
			setUser({
				...currentUserData,
				roleId: Number(currentUserData.roleId),
			}),
		);
	}, [dispatch]);

	return (
		<AppColumn>
			<Header></Header>
			<Page>
				<Routes>
					<Route path="/" element={<ProductsList />} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/products/:id" element={<Product />} />
					<Route path="/basket" element={<div>Корзина</div>} />
					<Route
						path="/productsManagment"
						element={<ProductsManagment />}
					/>
					<Route path="*" element={<div>Ошибка</div>} />
				</Routes>
			</Page>
			<Modal />
		</AppColumn>
	);
};
