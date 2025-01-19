import { useState } from 'react';

export const useCalendarDates = () => {
	const today = new Date();
	const [currentMonth, setCurrentMonth] = useState(today.getMonth());
	const [currentYear, setCurrentYear] = useState(today.getFullYear());

	const calculateDates = (month: number, year: number) => {
		const firstDay = new Date(year, month, 1).getDay();
		const lastDay = new Date(year, month + 1, 0).getDate();
		const dates = Array.from(
			{ length: lastDay },
			(_, i) => new Date(year, month, i + 1)
		);
		const empty = Array.from({ length: firstDay }, () => null);
		return [...empty, ...dates];
	};

	const handlePrevMonth = () => {
		if (currentMonth === 0) {
			setCurrentMonth(11);
			setCurrentYear((year) => year - 1);
		} else {
			setCurrentMonth((month) => month - 1);
		}
	};

	const handleNextMonth = () => {
		if (currentMonth === 11) {
			setCurrentMonth(0);
			setCurrentYear((year) => year + 1);
		} else {
			setCurrentMonth((month) => month + 1);
		}
	};

	return {
		currentMonth,
		currentYear,
		handlePrevMonth,
		handleNextMonth,
		calculateDates,
		setCurrentMonth,
		setCurrentYear,
	};
};
