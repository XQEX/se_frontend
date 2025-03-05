import React, { useEffect } from "react";
import { useUser } from "../context/UserContext";

const ExampleComponent: React.FC = () => {
  const { user, isLoading } = useUser();

  useEffect(() => {
    console.log("User data:", user);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in.</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.username}</h1>
      <p>Your ID: {user.id}</p>
      <p>firstName: {user.firstName}</p>
      <p>lastName: {user.lastName}</p>
      <p>type: {user.type}</p>
    </div>
  );
};

export default ExampleComponent;
