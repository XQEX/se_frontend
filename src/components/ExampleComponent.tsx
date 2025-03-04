import React from 'react';
import { useUser } from '../context/UserContext';

const ExampleComponent: React.FC = () => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {user ? (
        <div>Welcome, {user.username}!</div>
      ) : (
        <div>Please log in</div>
      )}
    </div>
  );
};

export default ExampleComponent;
