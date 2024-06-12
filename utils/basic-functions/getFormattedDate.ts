function getFormattedDateString(date: string) {
  return new Date(date).toDateString();
}

function getFormattedDateRangeString(startDate: string, endDate: string) {
  return `Event Duration : ${new Date(startDate).toDateString()} - ${new Date(
    endDate
  ).toDateString()}`;
}

export { getFormattedDateString, getFormattedDateRangeString };
