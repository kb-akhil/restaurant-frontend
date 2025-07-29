import React from 'react';
import './App.css'; // Keep the default App.css for basic styling

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Our Restaurant!</h1>
        <p>This is the **Frontend** of our Restaurant DevOps Project.</p>
        <p>Version: 1.0.0 (Deployed via Jenkins)</p>
        <button onClick={() => alert('Order placed! (Simulated)')}>
          Place Order
        </button>
      </header>
    </div>
  );
}

export default App;