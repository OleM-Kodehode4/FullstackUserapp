import React, { useState } from "react";
import { editUser } from "../api";

const EditProfile = ({ token }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editUser(token, firstName, lastName);
      alert("Profile updated!");
    } catch (err) {
      setError("Error updating profile: " + err.response.data.message);
    }
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <button type="submit">Update</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default EditProfile;
