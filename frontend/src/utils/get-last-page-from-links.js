export const getLastPageFromLinks = (links) => {
	const result = links
		? links.match(/_page=(\d{1,4})&_limit=\d{1,3}>; rel="last"/)
		: "";

	return result ? Number(result[1]) : 1;
};
