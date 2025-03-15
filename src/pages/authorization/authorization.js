import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { server } from "../../bff";
import { useState } from "react";
import styled from "styled-components";
import { Input, Button, H2, AuthFormError, Loader } from "../../components";
import { Link, Navigate } from "react-router-dom";
import { setUser } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { selectUserRole } from "../../Redux/selectors";
import { ROLE } from "../../constants/role";
import { useResetForm } from "../../hooks";

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
		server.autorize(login, password).then(({ error, response }) => {
			setLoading(false);
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}

			dispatch(setUser(response));
			sessionStorage.setItem(`userData`, JSON.stringify(response));
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
