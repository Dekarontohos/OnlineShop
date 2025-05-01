export const getDateFromMongoose = (string, UTC = 3) => {
	const date = new Date(string);

	const utcHours = date.getUTCHours();
	const utcMinutes = date.getUTCMinutes();

	let hours = (utcHours + UTC) % 24;
	let day = date.getUTCDate();
	let month = date.getUTCMonth() + 1;
	let year = date.getUTCFullYear();

	if (hours < utcHours) {
		day += 1;
		if (day > new Date(year, month, 0).getDate()) {
			day = 1;
			month += 1;
			if (month > 12) {
				month = 1;
				year += 1;
			}
		}
	}

	const formattedDate = `${String(hours).padStart(2, "0")}:${String(utcMinutes).padStart(2, "0")} ${String(day).padStart(2, "0")}.${String(month).padStart(2, "0")}.${year}`;

	return formattedDate;
};
