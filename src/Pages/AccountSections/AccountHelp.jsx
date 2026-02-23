import React, { useState } from "react";
import { Search, Plus, Minus } from "lucide-react";
import "./style/Help.css";

const AccountHelp = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    { q: "How do I book a wash?", a: "Select a service, choose your car, pick a time slot, and checkout." },
    { q: "Can I cancel or reschedule?", a: "Yes, cancellations are free up to 2 hours before the scheduled slot." },
    { q: "What payment methods do you accept?", a: "We accept Cards, UPI, Net Banking, and Pay After Service." }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.q.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="help-wrapper">
      <h2 className="content-title">Help & Support</h2>
      
      <div className="search-bar-container">
        <Search className="search-icon" size={18} />
        <input 
          type="text" 
          placeholder="Search for questions..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="faq-list">
        {filteredFaqs.map((item, i) => (
          <div 
            key={i} 
            className={`faq-card-img ${openIndex === i ? 'open' : ''}`} 
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <div className="faq-head-img">
              <span>{item.q}</span>
              <span className="arrow">
                {openIndex === i ? <Minus size={16} /> : <Plus size={16} />}
              </span>
            </div>
            {openIndex === i && <div className="faq-body-img">{item.a}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountHelp;