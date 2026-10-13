import { useState, useEffect } from 'react';
import '../App.css'; 

function Admin() {
  const [formData, setFormData] = useState({
    title: '', description: '', price: '', duration: '', category: ''
  });
  
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);

  // Fetch both services and bookings on load
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('http://localhost:5000/api/services')
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.error("Error fetching services:", err));

    fetch('http://localhost:5000/api/bookings')
      .then(res => res.json())
      .then(data => setBookings(data))
      .catch(err => console.error("Error fetching bookings:", err));
  };

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
      .then(res => res.json())
      .then(() => {
        alert('Service saved successfully!');
        setFormData({ title: '', description: '', price: '', duration: '', category: '' });
        fetchData();
      })
      .catch(err => console.error("Error saving service:", err));
  };

  const handleStatusChange = (bookingId, newStatus) => {
    fetch(`http://localhost:5000/api/bookings/${bookingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    })
      .then(res => res.json())
      .then(updated => {
        setBookings(bookings.map(b => b._id === bookingId ? { ...b, status: updated.status } : b));
      })
      .catch(err => console.error("Error updating status:", err));
  };

  const deleteService = (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      fetch(`http://localhost:5000/api/services/${id}`, { method: 'DELETE' })
        .then(() => fetchData())
        .catch(err => console.error("Error deleting service:", err));
    }
  };

  const deleteBooking = (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      fetch(`http://localhost:5000/api/bookings/${id}`, { method: 'DELETE' })
        .then(() => fetchData())
        .catch(err => console.error("Error deleting booking:", err));
    }
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

      {/* 2. Manage Services Section */}
      <h2>Manage Services</h2>
      {services.length === 0 ? (
        <p>No services found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '40px' }}>
          {services.map(service => (
            <li key={service._id} style={{ display: 'flex', justifyContent: 'space-between', background: '#fff', padding: '12px 20px', marginBottom: '10px', borderRadius: '6px', border: '1px solid #eee', alignItems: 'center' }}>
              <span><strong>{service.title}</strong> — ₹{service.price}</span>
              <button onClick={() => deleteService(service._id)} style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
            </li>
          ))}
        </ul>
      )}

      <hr style={{ border: '1px solid #eaeaea', margin: '30px 0' }} />

      {/* 3. Customer Bookings Table */}
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
              <th>Action</th>
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
                <td>
                  <select 
                    value={booking.status} 
                    onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                    style={{ padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', border: '1px solid #ccc' }}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => deleteBooking(booking._id)} style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Admin;