function getFormattedDateString(date: string) {
  return new Date(date).toDateString();
}

function getFormattedDateRangeString(startDate: string, endDate: string) {
  return `Event Duration : From "${new Date(
    startDate
  ).toDateString()}" to "${new Date(endDate).toDateString()}"`;
}

export { getFormattedDateString, getFormattedDateRangeString };
