import { useState, useEffect } from 'react';
import '../App.css';

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const customer = JSON.parse(localStorage.getItem('customer'));

  useEffect(() => {
    if (customer && customer.email) {
      fetch(`http://localhost:5000/api/bookings/customer/${customer.email}`)
        .then(res => res.json())
        .then(data => setBookings(data))
        .catch(err => console.error("Error fetching bookings:", err));
    }
  }, [customer]);

  if (!customer) {
    return (
      <div className="container" style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Please log in as a customer to view your bookings.</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="header">My Bookings</h1>
      <p style={{ color: '#7f8c8d', marginBottom: '30px' }}>
        Logged in as: <strong>{customer.name}</strong> ({customer.email})
      </p>

      {bookings.length === 0 ? (
        <p>You have no bookings yet. Go to the Home page to book a service!</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Service</th>
              <th>Date & Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td><strong>{booking.serviceId?.title || 'Service Unavailable'}</strong></td>
                <td>{booking.date} at {booking.time}</td>
                <td>
                  <span style={{ 
                    padding: '6px 12px', 
                    borderRadius: '4px', 
                    fontWeight: 'bold',
                    fontSize: '0.85rem',
                    background: booking.status === 'Approved' ? '#2ecc71' : booking.status === 'Completed' ? '#3498db' : '#f39c12',
                    color: 'white',
                    display: 'inline-block'
                  }}>
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyBookings;