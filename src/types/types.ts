const renderTimeTypes = () => {
  const map = new Map();

  for (let i = 1; i <= 28; i++) {
    map.set(`time${i}`, 'string');
  }

  for (let i = 29; i <= 31; i++) {
    map.set(`time${i}?`, 'string');
  }

  return Object.fromEntries(map);
};

const getTypes = {
  key: 'React.Key',
  name: 'string',
  ...renderTimeTypes(),
  monthly: 'string',
};

export type DataType = typeof getTypes;
