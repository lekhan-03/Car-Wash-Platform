import React from "react";
import { useOutletContext } from "react-router-dom";

const AccountDetails = () => {
  const { user } = useOutletContext();

  return (
    <div className="account-section">
      <h3>Account Details</h3>
      <div className="info-grid">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Mobile:</strong> {user.mobile}</p>
      </div>
    </div>
  );
};

export default AccountDetails;
