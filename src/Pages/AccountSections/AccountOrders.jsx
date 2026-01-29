import React, { useEffect, useState } from "react";
import "./style/Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(saved.reverse());
  }, []);

  return (
    <div className="orders-section">
      <h3 className="section-head">My Orders</h3>
      
      {orders.length === 0 ? (
        <div className="empty-state-box">
          <img src="https://cdn-icons-png.flaticon.com/512/4076/4076432.png" alt="No Orders" width="80" />
          <p>No orders yet. Start booking!</p>
        </div>
      ) : (
        <div className="orders-list-v2">
          {orders.map((order) => (
            <div key={order.id} className="order-card-v2">
              <div className="order-card-top">
                <div>
                  {/* FIX: Convert ID to String before slicing */}
                  <span className="order-id-tag">#{String(order.id).slice(-6)}</span>
                  <span className="order-date-text">{order.date}</span>
                </div>
                <span className={`status-badge ${order.status ? order.status.toLowerCase() : "pending"}`}>
                  {order.status || "Pending"}
                </span>
              </div>
              
              <div className="order-items-preview">
                {order.items.map((item, i) => (
                  <span key={i} className="item-name-pill">{item.quantity}x {item.name}</span>
                ))}
              </div>

              <div className="order-card-bottom">
                <span className="order-total-price">
                  ₹{order.bill?.grandTotal?.toFixed(0) || Number(order.total).toFixed(0)}
                </span>
                <button className="track-btn">Track Order</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;