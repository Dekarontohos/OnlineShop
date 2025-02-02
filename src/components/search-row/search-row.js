import styled from "styled-components";
import { MAIN_THEME } from "../../constants";

const Div = styled.div`
	padding: 10px;
	background: ${MAIN_THEME};
	align-items: center;
	justify-content: center;
	display: flex;
	border-radius: 5px;
	border: 2px solid rgb(0, 0, 0);
	margin: 0 0 10px 0;
	width: 100%;
`;

const SearchRowContainer = ({ children, className, ...props }) => (
	<Div>
		<input className={className} {...props} placeholder="Поиск по имени">
			{children}
		</input>
	</Div>
);

export const SearchRow = styled(SearchRowContainer)`
	font-size: 22px;
	width: 300px;
	text-align: center;
	border: 1px solid #000;
	border-radius: 5px;
	padding: 10px;
	width: 80%;
`;
