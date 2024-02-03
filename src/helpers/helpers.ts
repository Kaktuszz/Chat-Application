export const time = (time: string) => {
  const d = new Date();
  const diff = d.getTimezoneOffset();
  const timezone = diff / -60;
  let hour = time.slice(11, 13);
  let actualHour = parseInt(hour) + timezone;
  let minute = time.slice(14, 16);
  const actualTime = actualHour + ":" + minute;

  return actualTime;
};

export const clock = () => {
  const currentDate = new Date();
  const isoString = currentDate.toISOString();

  return isoString;
};


