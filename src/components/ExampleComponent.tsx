import React from "react";
import { useUser } from "../context/UserContext";

const ExampleComponent: React.FC = () => {
  const { user, isLoading, isLoggedIn } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return <div>Please log in.</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.username}</h1>
      <p>Your ID: {user.id}</p>
    </div>
  );
};

export default ExampleComponent;
