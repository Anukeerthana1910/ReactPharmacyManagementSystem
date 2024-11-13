import React, { useState, createContext } from 'react';
import './Homepage.css';

// Create MedicineContext inside HomePage.js
const MedicineContext = createContext();

const HomePage = ({ onLogout }) => {
  // Predefined medicines for demonstration
  const initialMedicines = [
    { id: '1', name: 'Aspirin', quantity: 100, price: 2.50, image: 'https://5.imimg.com/data5/SELLER/Default/2023/7/330506870/UM/GZ/QO/135658020/aspirin-dispersible-tablets.jpg' },
    { id: '2', name: 'Paracetamol', quantity: 200, price: 1.75, image: 'https://i.pinimg.com/564x/4d/fd/b4/4dfdb4dddad4ccd8d41034dcd6945d88.jpg' },
    { id: '3', name: 'Ibuprofen', quantity: 150, price: 2.00, image: 'https://5.imimg.com/data5/SELLER/Default/2023/7/325863554/WI/JM/SY/135658020/ibuprofen-tablets-ip-200-mg-.jpg' },
    { id: '4', name: 'Amoxicillin', quantity: 50, price: 3.00, image: 'https://www.novolillypharma.com/wp-content/uploads/2021/10/MOXYNOV-CV-625.jpg' },
  ];

  const [medicines] = useState(initialMedicines);
  const [isStarted, setIsStarted] = useState(false); // Toggle between landing page and medicine management
  const [checkoutItems, setCheckoutItems] = useState([]); // To manage selected medicines for checkout
  const [selectedQuantities, setSelectedQuantities] = useState({}); // Store selected quantities
  const [orderHistory, setOrderHistory] = useState([]); // Store completed orders for history

  const handleGetStarted = () => {
    setIsStarted(true); // Switch to medicine management section
  };

  const handleReturnHome = () => {
    setIsStarted(false); // Switch back to landing page
  };

  const handleCheckout = () => {
    if (checkoutItems.length === 0) {
      alert('No medicines selected for checkout.');
    } else {
      const totalAmount = checkoutItems.reduce((total, item) => {
        const selectedQty = selectedQuantities[item.id] || 1;
        return total + item.price * selectedQty;
      }, 0);
      
      const orderDetails = {
        items: checkoutItems.map(item => ({
          name: item.name,
          price: item.price,
          quantity: selectedQuantities[item.id] || 1,
        })),
        totalAmount: totalAmount.toFixed(2),
        date: new Date().toLocaleString(),
      };

      // Update the order history with the new order
      setOrderHistory([...orderHistory, orderDetails]);

      alert(`Checkout successful for: ${checkoutItems.map(item => item.name).join(', ')}. Total Amount: $${totalAmount.toFixed(2)}`);
      setCheckoutItems([]); // Clear the checkout items after checkout
      setSelectedQuantities({}); // Reset selected quantities
    }
  };

  const handleSelectMedicine = (medicine) => {
    if (!checkoutItems.includes(medicine)) {
      setCheckoutItems([...checkoutItems, medicine]);
    } else {
      alert(`${medicine.name} is already selected.`);
    }
  };

  const handleQuantityChange = (id, quantity, maxQuantity) => {
    if (quantity > maxQuantity) {
      alert(`You cannot select more than ${maxQuantity} units for this medicine.`);
      setSelectedQuantities({
        ...selectedQuantities,
        [id]: maxQuantity
      });
    } else if (quantity < 1) {
      setSelectedQuantities({
        ...selectedQuantities,
        [id]: 1 // Ensures at least 1 unit is selected
      });
    } else {
      setSelectedQuantities({
        ...selectedQuantities,
        [id]: quantity
      });
    }
  };

  return (
    <MedicineContext.Provider value={{ medicines }}>
      <div className="homepage-container">
        {isStarted ? (
          <div className="manage-medicines-container">
            <h1>Manage Medicines</h1>
            <button onClick={onLogout}>Logout</button>

            <section>
              <h2>Available Medicines</h2>

              {/* Medicine List */}
              <ul className='abc'>
                {medicines.map((medicine) => (
                  <li key={medicine.id} className='def'>
                    <img src={medicine.image} alt={medicine.name} className="medicine-image" />
                    {medicine.name} - ${medicine.price} per unit - {medicine.quantity} units
                    <button onClick={() => handleSelectMedicine(medicine)}>Select for Checkout</button>
                  </li>
                ))}
              </ul>

              {/* Checkout Section */}
              <div className="checkout-container">
                <h2 className="checkout-title">Checkout Medicines</h2>
                {checkoutItems.length > 0 ? (
                  <ul className="checkout-list">
                    {checkoutItems.map(item => (
                      <li key={item.id}>
                        <img src={item.image} alt={item.name} className="medicine-image" />
                        <span>{item.name} - ${item.price} per unit</span>
                        <input
                          type="number"
                          min="1"
                          max={item.quantity} // Set the max attribute dynamically based on available stock
                          value={selectedQuantities[item.id] || 1}
                          onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value), item.quantity)}
                        /> units
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No medicines selected for checkout.</p>
                )}
                
                <div className="checkout-total">
                  Total: ${checkoutItems.reduce((total, item) => {
                    const selectedQty = selectedQuantities[item.id] || 1;
                    return total + item.price * selectedQty;
                  }, 0).toFixed(2)}
                </div>

                <div className="button-container">
                  <button
                    className="checkout-btn"
                    onClick={handleCheckout}
                    disabled={checkoutItems.length === 0}
                  >
                    Checkout
                  </button>
                  <button className="return-btn" onClick={handleReturnHome}>
                    Return to Home Page
                  </button>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <div>
            <header className="navbar">
              <h1 className="logo">PharmaCare</h1>
              <nav>
                <ul>
                  <li><a href="#home">Home</a></li>
                  <li><a href="#features">Features</a></li>
                  <li><a href="#about">About</a></li>
                  <li><a href="#contact">Contact</a></li>
                  <li><button className="login-btn" onClick={onLogout}>Login</button></li>
                </ul>
              </nav>
            </header>

            <section id="home" className="hero-section">
              <div className="hero-content">
                <h2 className="hero-title">Your Trusted Partner in Pharmacy Management</h2>
                <p className="hero-description">
                  Streamline your pharmacy operations, manage inventory, track orders, and much more, all from one intuitive platform.
                </p>
                <button className="cta-btn" onClick={handleGetStarted}>Get Started</button>
              </div>
            </section>

            <section id="features" className="features-section">
              <h2 className="section-title">Features</h2>
              <div className="features-grid">
                <div className="feature-item">
                  <h3>Inventory Management</h3>
                  <p>Maintain real-time inventory levels, track stock, and set reorder alerts to ensure you never run out of essential medicines.</p>
                </div>
                <div className="feature-item">
                  <h3>Order Tracking</h3>
                  <p>Monitor orders from prescription to delivery with complete transparency, ensuring customer satisfaction.</p>
                </div>
                <div className="feature-item">
                  <h3>Comprehensive Reports</h3>
                  <p>Generate detailed reports on sales, stock, and financials to stay informed and make data-driven decisions.</p>
                </div>
                <div className="feature-item">
                  <h3>User Management</h3>
                  <p>Easily manage staff roles and access levels to protect sensitive data and streamline workflow.</p>
                </div>
              </div>
            </section>

            {/* Order History Section */}
            <section id="order-history" className="order-history-section">
              <h2 className="section-title">Order History</h2>
              {orderHistory.length > 0 ? (
                <ul className="order-history-list">
                  {orderHistory.map((order, index) => (
                    <li key={index}>
                      <p style={{color:"black"}}><strong>Order Date:</strong> {order.date}</p>
                      <ul>
                        {order.items.map((item, idx) => (
                          <li key={idx}>
                            {item.name} - {item.quantity} units @ ${item.price} per unit
                          </li>
                        ))}
                      </ul>
                      <p style={{color:"black"}}><strong>Total Amount:</strong> ${order.totalAmount}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No orders placed yet.</p>
              )}
            </section>

            <section id="about" className="about-section">
              <h2 className="section-title">About Us</h2>
              <p>
                PharmaCare is a leading provider of pharmacy management solutions, dedicated to helping healthcare providers offer exceptional care to their patients.
              </p>
            </section>

            <section id="contact" className="contact-section">
              <h2 className="section-title">Contact Us</h2>
              <p>
                For inquiries or support, please contact us at support@pharmacare.com or call us at +1 (123) 456-7890.
              </p>
            </section>

            <footer className="footer">
              <p>&copy; 2024 PharmaCare. All rights reserved.</p>
            </footer>
          </div>
        )}
      </div>
    </MedicineContext.Provider>
  );
};

export default HomePage;
