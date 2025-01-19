// 이전 달의 마지막 날짜
export const getPrevLastDate = (year: number, currentMonth: number) => {
	return new Date(year, currentMonth, 0).getDate();
};

// 현재 달의 마지막 날짜
export const getLastDate = (year: number, currentMonth: number) => {
	return new Date(year, currentMonth + 1, 0).getDate();
};

export const compareDate = (
	firstDate: Date | null,
	secondDate: Date | null
) => {
	return (
		!!firstDate &&
		!!secondDate &&
		firstDate.getFullYear() === secondDate.getFullYear() &&
		firstDate.getMonth() === secondDate.getMonth() &&
		firstDate.getDate() === secondDate.getDate()
	);
};

export const isBeforeDate = (firstDate: Date, secondDate: Date) => {
	if (firstDate.getFullYear() > secondDate.getFullYear()) return false;
	else if (
		firstDate.getFullYear() === secondDate.getFullYear() &&
		firstDate.getMonth() > secondDate.getMonth()
	)
		return false;
	else if (
		firstDate.getMonth() === secondDate.getMonth() &&
		firstDate.getDate() > secondDate.getDate()
	)
		return false;
	else if (compareDate(firstDate, secondDate)) return 'same';

	return true;
};
