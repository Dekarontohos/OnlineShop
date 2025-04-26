import PropTypes from "prop-types";
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

const SearchRowContainer = ({
	className,
	searchPhrase,
	onChange,
	...props
}) => (
	<Div>
		<input
			className={className}
			{...props}
			placeholder="Поиск по имени"
			value={searchPhrase}
			onChange={onChange}
		></input>
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

SearchRow.propTypesropTypes = {
	searchPhrase: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};
