const monthlyColumnSorter = (a: string, b: string): number => {
  const hours = (arg: string) => Number(arg !== '0' ? arg.split('h ')[0] : '0');

  const mins = (arg: string) => {
    if (arg === '') return 0;

    const m = arg.split('h');
    const mStr = m[m.length - 1];

    return Number(mStr.slice(1, mStr.length - 1));
  };

  const diff = hours(a) * 60 + mins(a) - (hours(b) * 60 + mins(b));

  return diff;
};

export default monthlyColumnSorter;
