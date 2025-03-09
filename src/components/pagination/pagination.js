import PropTypes from "prop-types";
import styled from "styled-components";
import { Button } from "..";

const PaginationContainer = ({ className, page, setPage, lastPage }) => {
	return (
		<div className={className}>
			<Button
				disabled={page === 1}
				fontSize={"16px"}
				width={"120px"}
				onClick={() => {
					setPage(1);
				}}
			>
				Начало
			</Button>
			<Button
				disabled={page === 1}
				fontSize={"16px;"}
				width={"120px"}
				onClick={() => {
					setPage(page - 1);
				}}
			>
				Предыдущая
			</Button>
			<div className="current-page">{page}</div>
			<Button
				disabled={page === lastPage}
				fontSize={"16px;"}
				width={"120px"}
				onClick={() => {
					setPage(page + 1);
				}}
			>
				Следующая
			</Button>
			<Button
				disabled={page === lastPage}
				fontSize={"16px;"}
				width={"120px"}
				onClick={() => {
					setPage(lastPage);
				}}
			>
				Конец
			</Button>
		</div>
	);
};

export const Pagination = styled(PaginationContainer)`
	display: flex;
	justify-content: center;
	margin: 10px 0;
	padding: 0 20px;
	bottom: 140px;

	& button {
		margin: 0 10px;
	}

	& .current-page {
		display: flex;
		justify-content: center;
		width: 50px;
		align-items: center;
		border: 1px solid #000;
		font-size: 20px;
		border-radius: 5px;
		height: 28px;
		background-color: rgb(238, 238, 238);
	}
`;

Pagination.propTypesropTypes = {
	page: PropTypes.number.isRequired,
	lastPage: PropTypes.number.isRequired,
	setPage: PropTypes.func.isRequired,
};
