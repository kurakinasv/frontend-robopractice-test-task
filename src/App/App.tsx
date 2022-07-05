import { FC } from 'react';

const App: FC = () => {
  const getUsers = async () => {
    const BASE_URL = 'http://localhost:8080';

    try {
      const response = await fetch(`${BASE_URL}/api/users`);
      const data = await response.json();

      console.log('data', data);
    } catch (e: any) {
      console.log('error', e);
    }
  };

  getUsers();

  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
};

export default App;
