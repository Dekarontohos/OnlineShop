import styled from "styled-components";
import { Icon, Button } from "../../../../components";
import { Link } from "react-router-dom";
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

const PanelIcon = styled(Link)`
	transition:
		transform 0.3s ease,
		color 0.3s ease;
	&:hover {
		color: #5c5c5c;
	}
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

	return (
		<div className={className}>
			<RightsAligned>
				{roleId === ROLE.GUEST ? (
					<Button width="70px">
						<Link to="/login">Войти</Link>
					</Button>
				) : (
					<>
						<UserName>{login}</UserName>
						<PanelIcon>
							<Icon
								id="fa fa-sign-out"
								margin="0 0 0 10px"
								size="26px"
								onClick={() => {
									dispatch(logout(session));
								}}
							></Icon>
						</PanelIcon>
					</>
				)}
			</RightsAligned>
			<RightsAligned>
				<PanelIcon to="/productsManagment">
					<Icon
						id="fa-th-list"
						margin="10px 0 0 0"
						size="26px"
					></Icon>
				</PanelIcon>
				<PanelIcon to="/basket">
					<Icon
						id="fa-shopping-basket"
						margin="6px 0 0 10px"
						size="24px"
					></Icon>
				</PanelIcon>
			</RightsAligned>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)``;
