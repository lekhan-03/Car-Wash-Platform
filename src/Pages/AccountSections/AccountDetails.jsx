import React from "react";
import { useOutletContext } from "react-router-dom";
import { Mail, Phone, Hash } from "lucide-react";
import "./style/AccountDetails.css";

const AccountDetails = () => {
  const { user } = useOutletContext();

  return (
    <div className="account-section">
      <h3 className="section-head">Personal Information</h3>
      <div className="info-grid-v2">
        <div className="info-card">
          <Hash className="info-icon" size={20} />
          <div>
            <span className="info-label">Username</span>
            <p className="info-value">{user.username || "Not set"}</p>
          </div>
        </div>
        <div className="info-card">
          <Mail className="info-icon" size={20} />
          <div>
            <span className="info-label">Email</span>
            <p className="info-value">{user.email || "Not set"}</p>
          </div>
        </div>
        <div className="info-card">
          <Phone className="info-icon" size={20} />
          <div>
            <span className="info-label">Mobile</span>
            <p className="info-value">{user.mobile || "+91 0000000000"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;