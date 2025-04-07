// pages/Dashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Få brukerinfo fra backend
    axios
      .get("http://localhost:5000/api/user") // Endpoint for å hente brukerinfo
      .then((response) => setUser(response.data))
      .catch((error) => console.log(error));
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Welcome, {user.firstName}!</h2>
      <p>Email: {user.email}</p>
      <p>
        Full Name: {user.firstName} {user.lastName}
      </p>
    </div>
  );
}

export default Dashboard;
