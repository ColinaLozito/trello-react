export const autoDueDate = () => { // function that format due date
	const dateObj = Date.now();
	const newDate = dateObj + 1000 * 60 * 60 * 24 * 3;
	const date = new Date(newDate);

    return date
}

export const autoCurrentDate = () => { // function that formar the start date
	const dateObj = Date.now();
	const date = new Date(dateObj);

    return date
}