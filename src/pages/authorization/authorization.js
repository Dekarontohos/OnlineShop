import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { server } from "../../bff";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Input, Button, H2 } from "../../components";
import { Link, Navigate } from "react-router-dom";
import { setUser } from "../../actions";
import { useDispatch, useStore, useSelector } from "react-redux";
import { selectUserRole } from "../../Redux/selectors";
import { ROLE } from "../../constants/role";

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

const ErrorMessage = styled.div`
	padding: 10px;
	margin: 10px 0 0;
	font-size: 18px;
	background-color: #fcadad;
	border-radius: 5px;
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

	const dispatch = useDispatch();

	const store = useStore();

	const roleId = useSelector(selectUserRole);

	useEffect(() => {
		let currentWasLogout = store.getState().app.wasLogout;

		return store.subscribe(() => {
			let previousWasLogout = currentWasLogout;
			currentWasLogout = store.getState().app.wasLogout;

			if (currentWasLogout !== previousWasLogout) {
				reset();
			}
		});
	}, [reset, store]);

	const onSubmit = ({ login, password }) => {
		server.autorize(login, password).then(({ error, response }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}

			dispatch(setUser(response));
		});
	};
	const formError = errors?.login?.message || errors?.password?.message;
	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/"></Navigate>;
	}

	return (
		<div className={className}>
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
				{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
				<StyledLink to="/register">Регистрация</StyledLink>
			</form>
		</div>
	);
};

export const Authorization = styled(AuthorizationContainer)`
	display: flex;
	align-items: center;
	flex-direction: column;

	& > form {
		display: flex;
		flex-direction: column;
		width: 260px;
	}
`;
