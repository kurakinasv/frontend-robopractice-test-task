const getTimeFromMinutes = (totalMinutes: number): number[] => {
  const h = Math.trunc(totalMinutes / 60);
  const m = totalMinutes - h * 60;

  return [h, m];
};

export default getTimeFromMinutes;
