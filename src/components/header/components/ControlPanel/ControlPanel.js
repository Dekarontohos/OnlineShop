import styled from "styled-components";
import { Icon } from "../../../icon/icon";
import { Link } from "react-router-dom";

const RightsAligned = styled.div`
	display: flex;
	justify-content: flex-end;
`;

const StyledLink = styled(Link)`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 18px;
	width: 80px;
	height: 28px;
	border: 1px solid #000;
	background-color: #eee;
	border-radius: 5px;
	&:hover {
		background-color: #dcdcdc;
	}
`;

const PanelIcon = styled(Link)`
	&:hover {
		color: #5c5c5c;
	}
`;

const ControlPanelContainer = ({ className }) => {
	return (
		<div className={className}>
			<RightsAligned>
				<StyledLink to="/login">Войти</StyledLink>
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
					<Icon id="fa-shopping-basket" margin="10px 0 0 16px"></Icon>
				</PanelIcon>
			</RightsAligned>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)``;
