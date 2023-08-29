const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const getFormattedDate = (date: string) => {
  const parsedDate = new Date(date);

  const year = parsedDate.getUTCFullYear();
  const month = monthNames[parsedDate.getMonth()];

  return `${month} ${year}`;
};
