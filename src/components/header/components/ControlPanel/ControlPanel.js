import styled from "styled-components";
import { Icon, Button } from "../../../../components";
import { Link, useNavigate } from "react-router-dom";
import { ROLE } from "../../../../constants/role";
import { useDispatch, useSelector } from "react-redux";
import {
	selectUserRole,
	selectUserLogin,
	selectUserSession,
} from "../../../../Redux/selectors";
import { logout } from "../../../../actions";

const RightsAligned = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	height: 34px;
	width: 150px;
`;

const UserName = styled.div`
	font-size: 17px;
	font-weight: bold;
}
`;

const ControlPanelContainer = ({ className }) => {
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);
	const session = useSelector(selectUserSession);

	const navigate = useNavigate();

	const onLogout = () => {
		dispatch(logout(session));
		sessionStorage.removeItem(`userData`);
		navigate("/login");
	};

	return (
		<div className={className}>
			<RightsAligned>
				{roleId === ROLE.GUEST ? (
					<Button
						width="70px"
						onClick={() => {
							navigate("/login");
						}}
					>
						Войти
					</Button>
				) : (
					<>
						<UserName>{login}</UserName>
						<Icon
							id="fa fa-sign-out"
							margin="0 0 0 10px"
							size="26px"
							onClick={onLogout}
						></Icon>
					</>
				)}
			</RightsAligned>
			<RightsAligned>
				{roleId === ROLE.ADMIN ? (
					<Link to="/productsManagment">
						<Icon
							id="fa-th-list"
							margin="10px 0 0 0"
							size="26px"
						></Icon>
					</Link>
				) : null}
				<Link to="/basket">
					<Icon
						id="fa-shopping-basket"
						margin="6px 0 0 10px"
						size="24px"
					></Icon>
				</Link>
			</RightsAligned>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)``;
