import { useState, useEffect } from 'react';
import '../App.css'; 

function Admin() {
  const [formData, setFormData] = useState({
    title: '', description: '', price: '', duration: '', category: ''
  });
  
  // New state to hold customer bookings
  const [bookings, setBookings] = useState([]);

  // Fetch bookings as soon as the Admin page loads
  useEffect(() => {
    fetch('http://localhost:5000/api/bookings')
      .then(response => response.json())
      .then(data => setBookings(data))
      .catch(error => console.error("Error fetching bookings:", error));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(() => {
        alert('Service saved successfully!');
        setFormData({ title: '', description: '', price: '', duration: '', category: '' });
      })
      .catch(error => console.error("Error saving service:", error));
  };

  return (
    <div className="container">
      <h1 className="header">Admin Dashboard</h1>
      
      {/* 1. Add Service Form */}
      <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '40px' }}>
        <h2>Add New Service</h2>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <input name="title" placeholder="Service Title" value={formData.title} onChange={handleChange} required style={{ padding: '10px' }} />
          <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} required style={{ padding: '10px' }} />
          <input name="price" type="number" placeholder="Price (₹)" value={formData.price} onChange={handleChange} required style={{ padding: '10px' }} />
          <input name="duration" type="number" placeholder="Duration (mins)" value={formData.duration} onChange={handleChange} required style={{ padding: '10px' }} />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required style={{ gridColumn: 'span 2', padding: '10px' }} rows="3" />
          <button type="submit" className="book-btn" style={{ gridColumn: 'span 2' }}>Save Service</button>
        </form>
      </div>

      <hr style={{ border: '1px solid #eaeaea', margin: '30px 0' }} />

      {/* 2. Customer Bookings Table */}
      <h2>Recent Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Service</th>
              <th>Date & Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>
                  <strong>{booking.customerName}</strong><br/>
                  <span style={{ fontSize: '0.85rem', color: '#7f8c8d' }}>{booking.customerEmail}</span>
                </td>
                <td>{booking.serviceId?.title || 'Service Unavailable'}</td>
                <td>{booking.date} at {booking.time}</td>
                <td><span className={`status-badge status-${booking.status}`}>{booking.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Admin;