export type Period = '오전' | '오후';

export interface TimeFormat {
	HOURS_24: number;
	HOURS_12: number;
	MINUTES_MAX: number;
	DEFAULT_TIME: string;
	AM: Period;
	PM: Period;
	AM_EN: string;
	PM_EN: string;
}

export const TIME_FORMAT: TimeFormat = {
	HOURS_24: 24,
	HOURS_12: 12,
	MINUTES_MAX: 60,
	DEFAULT_TIME: '00:00',
	AM: '오전',
	PM: '오후',
	AM_EN: 'AM',
	PM_EN: 'PM',
} as const; 