import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Package, ChevronRight } from 'lucide-react';
import './ChatbotWidget.css';

// --- MOCK DATA ---
// In a real app, you would fetch these from your backend/context
const mockOrders = [
  { id: "ORD-8392", service: "Premium Foam Wash", date: "Today, 10:00 AM", status: "In Progress" },
  { id: "ORD-8345", service: "Interior Deep Cleaning", date: "24 Feb 2026", status: "Completed" }
];

const faqs = [
  { q: "What are your working hours?", a: "We operate from 8:00 AM to 8:00 PM, 7 days a week!" },
  { q: "Do you provide doorstep service?", a: "Yes! We provide fully equipped doorstep detailing services at no extra travel cost within city limits." },
  { q: "How do I cancel my booking?", a: "You can cancel your booking up to 2 hours before the scheduled time from the 'My Bookings' section for a full refund." }
];

// --- MAIN MENU OPTIONS ---
// We define this here so we can show the exact same menu at the start AND when the user clicks "Main Menu"
const mainMenuOptions = [
  // 1. Spread all the FAQs directly into the initial options
  ...faqs.map((faq, index) => ({
    label: faq.q,
    action: `FAQ_${index}`
  })),
  // 2. Add the Order & Agent options at the bottom
  { label: "Help with an Order", action: "SHOW_ORDERS" },
  { label: "Other Queries", action: "AGENT" }
];

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  
  // Initial Greeting now uses the expanded Main Menu Options
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: "bot", 
      text: "Hi Lekhan! 👋 Welcome to Rev2Blush Support. How can we help you today?",
      options: mainMenuOptions
    }
  ]);
  
  const messagesEndRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Simulate typing delay for bot responses
  const simulateBotReply = (replyData) => {
    setTimeout(() => {
      setMessages((prev) => [...prev, { id: Date.now(), sender: "bot", ...replyData }]);
    }, 600);
  };

  // --- HANDLE QUICK REPLY CLICKS ---
  const handleOptionClick = (option) => {
    // Add user's selected option as a message
    setMessages((prev) => [...prev, { id: Date.now(), sender: "user", text: option.label }]);

    // Determine Bot's Response based on action
    if (option.action === "SHOW_ORDERS") {
      simulateBotReply({
        text: "Please select the order you need help with:",
        orders: mockOrders
      });
    } 
    else if (option.action.startsWith("FAQ_")) {
      const faqIndex = parseInt(option.action.split("_")[1]);
      simulateBotReply({
        text: faqs[faqIndex].a,
        options: [
          { label: "Main Menu", action: "MAIN_MENU" }
        ]
      });
    }
    else if (option.action === "ORDER_SELECTED") {
      simulateBotReply({
        text: `What issue are you facing with ${option.orderId}?`,
        options: [
          { label: "Track Status", action: "AGENT" },
          { label: "Cancel Order", action: "AGENT" },
          { label: "Reschedule", action: "AGENT" }
        ]
      });
    }
    else if (option.action === "MAIN_MENU") {
      simulateBotReply({
        text: "What else can we help you with?",
        options: mainMenuOptions // Shows the full list of FAQs + Orders again
      });
    }
    else {
      // Catch-all for AGENT or unhandled actions
      simulateBotReply({
        text: "Thanks for letting us know! A premium care expert will review this and contact you shortly. 📞"
      });
    }
  };

  // --- HANDLE TYPED MESSAGES ---
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { id: Date.now(), sender: "user", text: inputText }]);
    setInputText("");

    // Fallback response for any typed text
    simulateBotReply({
      text: "Thanks for reaching out! We have noted your query and our support team will contact you shortly regarding this."
    });
  };

  return (
    <div className="chatbot-wrapper">
      {/* --- CHAT WINDOW --- */}
      <div className={`chat-window ${isOpen ? "open" : ""}`}>
        
        {/* Header */}
        <div className="chat-header">
          <div className="header-info">
            <div className="bot-avatar">
              <Bot size={20} color="#fff" />
            </div>
            <div>
              <h4>Rev2Blush Support</h4>
              <p>Online • Replies instantly</p>
            </div>
          </div>
          <button className="close-btn" onClick={() => setIsOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="chat-body">
          {messages.map((msg) => (
            <div key={msg.id} className={`message-block ${msg.sender}`}>
              
              {/* Text Bubble */}
              {msg.text && (
                <div className="chat-bubble">
                  {msg.text}
                </div>
              )}

              {/* Quick Reply Options */}
              {msg.options && msg.sender === "bot" && (
                <div className="options-container">
                  {msg.options.map((opt, i) => (
                    <button 
                      key={i} 
                      className="quick-reply-btn"
                      onClick={() => handleOptionClick(opt)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Order Cards */}
              {msg.orders && msg.sender === "bot" && (
                <div className="orders-container">
                  {msg.orders.map((order) => (
                    <div 
                      key={order.id} 
                      className="order-card-bot"
                      onClick={() => handleOptionClick({ label: `Order ${order.id}`, action: "ORDER_SELECTED", orderId: order.id })}
                    >
                      <div className="order-icon-wrapper">
                        <Package size={16} />
                      </div>
                      <div className="order-details">
                        <span className="order-name">{order.service}</span>
                        <span className="order-date">{order.date} • {order.status}</span>
                      </div>
                      <ChevronRight size={16} className="order-arrow" />
                    </div>
                  ))}
                </div>
              )}

            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form className="chat-footer" onSubmit={handleSendMessage}>
          <input 
            type="text" 
            placeholder="Type your message..." 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button type="submit" className="send-btn" disabled={!inputText.trim()}>
            <Send size={16} />
          </button>
        </form>
      </div>

      {/* --- FLOATING ACTION BUTTON --- */}
      <button 
        className={`chat-fab ${isOpen ? "hidden" : ""}`} 
        onClick={() => setIsOpen(true)}
      >
        <Bot size={28} />
      </button>
    </div>
  );
}