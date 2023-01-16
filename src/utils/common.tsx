const Month = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export const LEFT_SIDE_NAVE_WIDTH_OFFSET = 102;
export const isPrimitive = (val: any) => {
  if (val === null) {
    return;
  }

  if (typeof val == "object" || typeof val == "function") {
    return false;
  } else {
    return true;
  }
};

export const DateToString = (date: Date) => {
  if (!date) return date;

  const d = new Date(date);
  return `${d.getDate()} ${Month[d.getMonth()]} ${d.getFullYear()}`;
};
