import React from "react";
import { useOutletContext } from "react-router-dom";

const AccountPayments = () => {
  const { user } = useOutletContext();
  return (
    <div className="account-section">
      <h3>Payment Options</h3>
      <p>Wallets & Cards are on the way! Get ready for a faster, smarter, and seamless payment experience — stay tuned for the update!</p>
    </div>
  );
};

export default AccountPayments;
