import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import styled from "styled-components";
import { Input, Button, H2, AuthFormError, Loader } from "../../components";
import { Link, Navigate } from "react-router-dom";
import { setUser } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { selectUserRole } from "../../Redux/selectors";
import { ROLE } from "../../constants/role";
import { useResetForm } from "../../hooks";
import { request } from "../../utils/request";
import { setProductsInBasket } from "../../actions/set-products-in-basket";

const authFromScheme = yup.object().shape({
	login: yup
		.string()
		.required("Требуется ввести логин.")
		.matches(
			/^\w+$/,
			"Некорректный логин. Допускаются только буквы и цифры и нижнее подчёркивание.",
		)
		.min(3, "Некорректный логин. Требуется минимум три символа.")
		.max(
			15,
			"Некорректный логин. Логин должен содержать не более 15 символов.",
		),
	password: yup
		.string()
		.required("Требуется ввод пароля.")
		.matches(
			/^[\w#%]+$/,
			'Некорректный пароль. Допускаются буквы, цифры и знаки "#" и "%" .',
		)
		.min(6, "Некорректный пароль. Требуется минимум 6 символов.")
		.max(
			30,
			"Некорректный пароль. Пароль должен содержать не более 30 символов.",
		),
});

const StyledLink = styled(Link)`
	text-align: center;
	text-decoration: underline;
	margin: 20px 0;
	font-size: 18px;
`;

const AuthorizationContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: { login: "", password: "" },
		resolver: yupResolver(authFromScheme),
	});

	const [serverError, setServerError] = useState(null);
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();

	const roleId = useSelector(selectUserRole);

	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		setLoading(true);
		request("/login", "POST", { login, password })
			.then(({ error, user }) => {
				if (error) {
					setServerError(`Ошибка запроса: ${error}`);
					return;
				}

				dispatch(setUser(user));
				sessionStorage.setItem(`userData`, JSON.stringify(user));
			})
			.then(() => {
				const userData = JSON.parse(sessionStorage.getItem("userData"));
				const localBasket = JSON.parse(
					localStorage.getItem("productsInBasket"),
				);

				if (localBasket) {
					localBasket.forEach((localProduct) => {
						const userProductIndex = userData.basket.findIndex(
							(userProduct) => userProduct.id === localProduct.id,
						);

						if (userProductIndex !== -1) {
							userData.basket[userProductIndex].quantity +=
								localProduct.quantity;
						} else {
							userData.basket.push(localProduct);
						}
					});
				}

				request(`/users/${userData.id}/basket`, "PATCH", {
					basket: userData.basket.map((state) => {
						return {
							product: state.id,
							quantity: state.quantity,
						};
					}),
				}).then((res) => {
					sessionStorage.setItem(
						"userData",
						JSON.stringify(userData),
					);
					dispatch(setProductsInBasket(userData.basket));
				});

				setLoading(false);
			});
	};
	const formError = errors?.login?.message || errors?.password?.message;
	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/"></Navigate>;
	}

	return (
		<div className={className}>
			<Loader isVisible={loading} />
			<H2>Авторизация</H2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					placeholder="Логин..."
					{...register("login", {
						onChange: () => setServerError(null),
					})}
				></Input>
				<Input
					type="password"
					placeholder="Пароль..."
					{...register("password", {
						onChange: () => setServerError(null),
					})}
				></Input>
				<Button type="submit" disabled={!!formError}>
					Авторизоваться
				</Button>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
				<StyledLink to="/register">Регистрация</StyledLink>
			</form>
		</div>
	);
};

export const Authorization = styled(AuthorizationContainer)`
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	height: calc(100vh - 240px);

	& > form {
		display: flex;
		flex-direction: column;
		width: 260px;
		height: 200px;
	}
`;
