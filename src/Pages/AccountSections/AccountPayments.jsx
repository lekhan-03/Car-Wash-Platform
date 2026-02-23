import React from "react";
import { CreditCard, Plus } from "lucide-react";
import "./style/Payments.css";

const AccountPayments = () => {
  return (
    <div className="payments-wrapper">
      <h2 className="payments-title">Payments & Wallet</h2>

      {/* Wallet Card - Midnight Blue Theme */}
      <div className="wallet-card">
        <p className="wallet-subtitle">Rev2Blush Wallet Balance</p>
        <h3 className="wallet-balance">₹0.00</h3>
        <button className="add-money-btn">
          <Plus size={16} strokeWidth={2.5} /> Add Money
        </button>
      </div>

      {/* Saved Cards Section (In Development) */}
      <div className="saved-cards-card">
        <div className="cards-icon-wrapper">
          <CreditCard size={36} strokeWidth={1.5} />
        </div>
        <h4>Saved Cards & UPI</h4>
        <p>
          Direct card and UPI saving features are currently in development. Get ready for a faster, smarter checkout experience soon!
        </p>
      </div>
    </div>
  );
};

export default AccountPayments;