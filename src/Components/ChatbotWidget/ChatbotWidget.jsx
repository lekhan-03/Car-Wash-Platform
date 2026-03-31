import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Package, ChevronRight, CheckCircle2, HeadphonesIcon } from 'lucide-react';
import './ChatbotWidget.css';

// --- MOCK DATA ---
const mockOrders = [
  { id: "ORD-8392", service: "Premium Foam Wash", date: "Today, 10:00 AM", status: "In Progress" },
  { id: "ORD-8345", service: "Interior Deep Cleaning", date: "24 Feb 2026", status: "Completed" },
  { id: "ORD-8210", service: "Ceramic Coating (Hatchback)", date: "15 Jan 2026", status: "Completed" }
];

const faqs = [
  { q: "What are your working hours?", a: "We operate from 8:00 AM to 8:00 PM, 7 days a week!" },
  { q: "Do you provide doorstep service?", a: "Yes! We provide fully equipped doorstep detailing services at no extra travel cost within city limits." },
  { q: "How do I cancel my booking?", a: "You can cancel your booking up to 2 hours before the scheduled time for a full refund." }
];

const mainMenuOptions = [
  { label: "Track or Manage Order", action: "SHOW_ORDERS" },
  ...faqs.map((faq, index) => ({
    label: faq.q,
    action: `FAQ_${index}`
  })),
  { label: "Talk to an Expert", action: "AGENT" }
];

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  // State Machine Context
  const [botContext, setBotContext] = useState(null); // 'awaiting_cancel_reason', 'awaiting_reschedule_date', 'awaiting_issue_desc'
  const [activeOrder, setActiveOrder] = useState(null); 

  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: "bot", 
      text: "Hi Lekhan! 👋 I'm your Rev2Blush Virtual Assistant. How can I help you today?",
      options: mainMenuOptions
    }
  ]);
  
  const messagesEndRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Unified Bot Reply Simulator
  const simulateBotReply = (replyData, delay = 800) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { id: Date.now(), sender: "bot", ...replyData }]);
    }, delay);
  };

  // --- HANDLE QUICK REPLY CLICKS ---
  const handleOptionClick = (option) => {
    setMessages((prev) => [...prev, { id: Date.now(), sender: "user", text: option.label }]);

    if (option.action === "SHOW_ORDERS") {
      simulateBotReply({
        text: "Please select an order from your recent history:",
        orders: mockOrders
      });
    } 
    else if (option.action.startsWith("FAQ_")) {
      const faqIndex = parseInt(option.action.split("_")[1]);
      simulateBotReply({
        text: faqs[faqIndex].a,
        options: [{ label: "Back to Main Menu", action: "MAIN_MENU" }]
      });
    }
    else if (option.action === "ORDER_SELECTED") {
      setActiveOrder(option.orderId);
      simulateBotReply({
        text: `Got it. What would you like to do with ${option.orderId}?`,
        options: [
          { label: "Track Status", action: "TRACK_ORDER" },
          { label: "Reschedule", action: "RESCHEDULE_ORDER" },
          { label: "Cancel Order", action: "CANCEL_ORDER" },
          { label: "Invoice/Receipt", action: "GET_INVOICE" },
          { label: "Main Menu", action: "MAIN_MENU" }
        ]
      });
    }
    else if (option.action === "TRACK_ORDER") {
      simulateBotReply({ 
        text: "📍 Your service partner is currently 10 mins away and en route to your location. You will receive a call shortly.",
        options: [{ label: "Help with something else", action: "MAIN_MENU" }]
      });
    }
    else if (option.action === "RESCHEDULE_ORDER") {
      setBotContext("awaiting_reschedule_date");
      simulateBotReply({ text: "Sure! What new date and time would you like to reschedule this order to? (e.g. 'Tomorrow at 4PM')" });
    }
    else if (option.action === "CANCEL_ORDER") {
      setBotContext("awaiting_cancel_reason");
      simulateBotReply({ text: "I can help with that. Could you please let me know the reason for cancellation so we can improve?" });
    }
    else if (option.action === "GET_INVOICE") {
      simulateBotReply({ 
        text: "I have emailed the digital invoice to your registered email address 📧.",
        options: [{ label: "Main Menu", action: "MAIN_MENU" }]
      });
    }
    else if (option.action === "AGENT") {
      setBotContext("awaiting_issue_desc");
      simulateBotReply({ text: "I'll connect you to a human expert. Please type a brief description of what you need help with." });
    }
    else if (option.action === "MAIN_MENU") {
      setBotContext(null);
      simulateBotReply({
        text: "What else can I help you with?",
        options: mainMenuOptions
      });
    }
  };

  // --- HANDLE NLP & TYPED MESSAGES ---
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const text = inputText.trim();
    
    setMessages((prev) => [...prev, { id: Date.now(), sender: "user", text }]);
    setInputText("");

    // 1. STATE MACHINE INTERCEPTION (User is in the middle of a flow)
    if (botContext === "awaiting_cancel_reason") {
      setBotContext(null);
      simulateBotReply({ 
        text: `Order ${activeOrder || ''} has been successfully cancelled. If you prepaid, the refund will reflect in your account within 3-5 business days.`, 
        icon: "check",
        options: [{ label: "Main Menu", action: "MAIN_MENU" }]
      });
      return;
    }
    if (botContext === "awaiting_reschedule_date") {
      setBotContext(null);
      simulateBotReply({ 
        text: `Perfect! Order ${activeOrder || ''} is now rescheduled to: ${text}. You'll receive a confirmation SMS shortly.`, 
        icon: "check",
        options: [{ label: "Main Menu", action: "MAIN_MENU" }]
      });
      return;
    }
    if (botContext === "awaiting_issue_desc") {
      setBotContext(null);
      simulateBotReply({ text: "Thanks. Please hold on while I find an available agent... 🎧", icon: "agent" }, 600);
      
      // Simulate human agent joining after an artificial delay
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setMessages((prev) => [...prev, { 
            id: Date.now(), 
            sender: "bot agent", 
            text: "Hi there! I'm Daniel from the Support Team. I'm reviewing your message now. How are you doing today?" 
          }]);
        }, 1500);
      }, 2500);
      return;
    }

    // 2. SIMULATED NLP (Keyword Regex Matching)
    const lower = text.toLowerCase();
    
    if (lower.match(/\b(hi|hello|hey|start)\b/)) {
      simulateBotReply({ text: "Hello again! How can I assist you?", options: mainMenuOptions });
    }
    else if (lower.match(/\b(cancel|refund|return)\b/)) {
      simulateBotReply({ 
        text: "It looks like you want to cancel an order or request a refund. Which order is this regarding?", 
        orders: mockOrders 
      });
    }
    else if (lower.match(/\b(order|track|where|status)\b/)) {
      simulateBotReply({ text: "Let's check your recent orders. Please select one:", orders: mockOrders });
    }
    else if (lower.match(/\b(reschedule|change time|change date|postpone)\b/)) {
      simulateBotReply({ text: "Which order would you like to reschedule?", orders: mockOrders });
    }
    else if (lower.match(/\b(human|agent|person|support|call|expert)\b/)) {
      setBotContext("awaiting_issue_desc");
      simulateBotReply({ text: "I can connect you to a human expert. Please briefly describe what you need help with." });
    }
    else if (lower.match(/\b(price|cost|how much|charges)\b/)) {
      simulateBotReply({ 
        text: "Our prices vary based on your car type (Hatchback, Sedan, SUV). A basic doorstep wash starts at just ₹249!",
        options: [{ label: "View Services Menu", action: "MAIN_MENU" }] 
      });
    }
    else {
      // 3. FALLBACK
      simulateBotReply({ 
        text: "I'm still learning and might not understand that completely. But I can easily help you with these topics:", 
        options: mainMenuOptions 
      });
    }
  };

  return (
    <div className="chatbot-wrapper">
      {/* --- CHAT WINDOW --- */}
      <div className={`chat-window ${isOpen ? "open" : ""}`}>
        
        {/* Header */}
        <div className="chat-header">
          <div className="header-info">
            <div className="bot-avatar glass-avatar">
              <Bot size={22} color="#fff" strokeWidth={2.5} />
            </div>
            <div>
              <h4>Rev2Blush Virtual Assistant</h4>
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
            <div key={msg.id} className={`message-block ${msg.sender.includes("bot") ? "bot" : "user"}`}>
              
              {msg.icon === "check" && (
                <div className="chat-success-icon"><CheckCircle2 size={16} /></div>
              )}
              {msg.icon === "agent" && (
                <div className="chat-success-icon agent-icon"><HeadphonesIcon size={16} /></div>
              )}

              {/* Text Bubble */}
              {msg.text && (
                <div className={`chat-bubble ${msg.sender === "bot agent" ? "human-agent-bubble" : ""}`}>
                  {msg.text}
                </div>
              )}

              {/* Quick Reply Options */}
              {msg.options && (
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
              {msg.orders && (
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
                        <span className="order-date">{order.date} • <strong style={{color: order.status === 'Completed' ? '#10b981' : '#3b82f6'}}>{order.status}</strong></span>
                      </div>
                      <ChevronRight size={16} className="order-arrow" />
                    </div>
                  ))}
                </div>
              )}

            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="message-block bot">
              <div className="typing-indicator">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form className="chat-footer" onSubmit={handleSendMessage}>
          <input 
            type="text" 
            placeholder={botContext ? "Type your response..." : "Ask me anything..."} 
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