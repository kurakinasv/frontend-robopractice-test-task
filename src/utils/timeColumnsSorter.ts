const timeColumnsSorter = (a: string, b: string) => {
  const [aHours, aMins] = a !== '0' ? a.split(':') : [0, 0];
  const [bHours, bMins] = b !== '0' ? b.split(':') : [0, 0];

  const diff = +aHours * 60 + +aMins - (+bHours * 60 + +bMins);

  return diff;
};

export default timeColumnsSorter;
