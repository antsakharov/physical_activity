import dayjs, { Dayjs } from 'dayjs';

export function getRemainingTimeMsTimestamp(timestampMs: number) {
	const timestampDayjs = dayjs(timestampMs);
	const nowDayjs = dayjs();

	if (timestampDayjs.isBefore(nowDayjs)) {
		return {
			seconds: '00',
			minutes: '00',
			hours: '00',
			days: '00',
		};
	}

	return {
		seconds: getRemainingSeconds(nowDayjs, timestampDayjs),
		minutes: getRemainingMinutes(nowDayjs, timestampDayjs),
		hours: getRemainingHours(nowDayjs, timestampDayjs),
		days: getRemainingDays(nowDayjs, timestampDayjs),
	};
}

function getRemainingSeconds(nowDayjs: Dayjs, timestampDayjs: Dayjs) {
	const seconds = timestampDayjs.diff(nowDayjs, 'seconds') % 60;
	return padWithZeros(seconds, 2);
}

function getRemainingMinutes(nowDayjs: Dayjs, timestampDayjs: Dayjs) {
	const minutes = timestampDayjs.diff(nowDayjs, 'minutes') % 60;
	return padWithZeros(minutes, 2);
}

function getRemainingHours(nowDayjs: Dayjs, timestampDayjs: Dayjs) {
	const hours = timestampDayjs.diff(nowDayjs, 'hours') % 24;
	return padWithZeros(hours, 2);
}

function getRemainingDays(nowDayjs: Dayjs, timestampDayjs: Dayjs) {
	const days = timestampDayjs.diff(nowDayjs, 'days');
	return days.toString();
}

function padWithZeros(number: number, minLength: number) {
	const numberString = number.toString();
	if (numberString.length >= minLength) return numberString;
	return '0'.repeat(minLength - numberString.length) + numberString;
}
