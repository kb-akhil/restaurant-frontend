import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [backendMessage, setBackendMessage] = useState('');
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [orderStatus, setOrderStatus] = useState(null);

  // Effect to fetch backend health check message
  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:80/')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then(data => setBackendMessage(data))
      .catch(err => {
        console.error("Error fetching backend message:", err);
        setError("Failed to connect to backend health check.");
      })
      .finally(() => setIsLoading(false));
  }, []);

  // Effect to fetch menu items from backend
  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:80/menu')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Fetched menu items:", data);
        setMenuItems(data);
      })
      .catch(err => {
        console.error("Error fetching menu items:", err);
        setError("Failed to fetch menu items from backend.");
      })
      .finally(() => setIsLoading(false));
  }, []);

  const placeOrder = () => {
    setIsLoading(true);
    setOrderStatus(null);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setOrderStatus('success');
      setIsLoading(false);
    }, 1500);
    
    // In a real app, you'd use something like:
    /*
    fetch('http://localhost:80/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: selectedItems })
    })
    .then(response => response.json())
    .then(data => setOrderStatus('success'))
    .catch(err => setOrderStatus('error'))
    .finally(() => setIsLoading(false));
    */
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="restaurant-title">🍽️ Welcome to Our Restaurant!</h1>
        <p className="app-description">This is the frontend of our Restaurant DevOps Project.</p>
        <div className="version-badge">Version: 1.0.0</div>
      </header>

      <main className="main-content">
        {isLoading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
        ) : (
          <>
            {error && (
              <div className="error-message">
                ⚠️ Error: {error}
              </div>
            )}

            <div className="status-card">
              <h3>System Status</h3>
              {backendMessage ? (
                <p className="status-success">✓ Backend is healthy: {backendMessage}</p>
              ) : (
                <p className="status-warning">Connecting to backend...</p>
              )}
            </div>

            <section className="menu-section">
              <h2>Our Menu</h2>
              {menuItems.length > 0 ? (
                <div className="menu-grid">
                  {menuItems.map((item, index) => (
                    <div key={index} className="menu-item">
                      <h3>{item.name}</h3>
                      <p className="item-price">${item.price.toFixed(2)}</p>
                      {item.description && <p className="item-description">{item.description}</p>}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-items">No menu items available (check backend/DynamoDB).</p>
              )}
            </section>

            <div className="order-section">
              <button 
                onClick={placeOrder} 
                className="order-button"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Place Order'}
              </button>
              
              {orderStatus === 'success' && (
                <div className="order-success">
                  ✅ Order placed successfully!
                </div>
              )}
              {orderStatus === 'error' && (
                <div className="order-error">
                  ❌ Failed to place order. Please try again.
                </div>
              )}
            </div>
          </>
        )}
      </main>

      <footer className="app-footer">
        <p>© {new Date().getFullYear()} Restaurant DevOps Project</p>
      </footer>
    </div>
  );
}

export default App;