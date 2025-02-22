import styled from "styled-components";
import { Logo, ControlPanel } from "./components";

const Discription = styled.div`
	font-style: italic;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 22px;
`;

const HeaderContainer = ({ className }) => (
	<header className={className}>
		<Logo></Logo>
		<Discription>
			Бытовая техника <br /> для счастливой жизни!
		</Discription>
		<ControlPanel></ControlPanel>
	</header>
);

export const Header = styled(HeaderContainer)`
	display: flex;
	justify-content: space-between;
	height: 120px;
	padding: 20px 40px;
	box-shadow: 0px -2px 17px #000;
	position: fixed;
	top: 0;
	width: 100%;
	background-color: #fff;
`;
