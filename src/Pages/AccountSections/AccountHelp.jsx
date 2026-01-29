import React, { useState } from "react";
import "./style/Help.css";

const Help = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { q: "How do I book?", a: "Select a service, choose your car, pick a time slot, and checkout." },
    { q: "Can I cancel?", a: "Yes, cancellations are free up to 2 hours before the scheduled slot." },
    { q: "Payment methods?", a: "We accept Cards, UPI, Net Banking, and Pay After Service." }
  ];

  return (
    <div className="help-wrapper">
      <h2>Help & Support</h2>
      
      <div className="faq-list">
        {faqs.map((item, i) => (
          <div key={i} className={`faq-card ${openIndex === i ? 'open' : ''}`} onClick={() => setOpenIndex(openIndex === i ? null : i)}>
            <div className="faq-head">
              <span>{item.q}</span>
              <span className="arrow">{openIndex === i ? "−" : "+"}</span>
            </div>
            {openIndex === i && <div className="faq-body">{item.a}</div>}
          </div>
        ))}
      </div>

      <div className="contact-box">
        <p>Still need help?</p>
        <div className="contact-btns">
          <button className="c-btn mail">Email Us</button>
          <button className="c-btn chat">Chat Now</button>
        </div>
      </div>
    </div>
  );
};

export default Help;