import { useState, useEffect } from 'react';
import '../App.css'; 

function Home() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null); // Tracks which service was clicked
  const [bookingData, setBookingData] = useState({
    customerName: '',
    customerEmail: '',
    date: '',
    time: ''
  });

  // Fetch services when page loads
  useEffect(() => {
    fetch('http://localhost:5000/api/services')
      .then(response => response.json())
      .then(data => setServices(data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const handleInputChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const submitBooking = (e) => {
    e.preventDefault();
    
    // Combine the form data with the specific service ID
    const finalBooking = {
      ...bookingData,
      serviceId: selectedService._id
    };

    fetch('http://localhost:5000/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(finalBooking)
    })
      .then(response => response.json())
      .then(() => {
        alert('Booking confirmed!');
        setSelectedService(null); // Close the modal
        setBookingData({ customerName: '', customerEmail: '', date: '', time: '' }); // Reset form
      })
      .catch(error => console.error("Error saving booking:", error));
  };

  return (
    <div className="container">
      <h1 className="header">Available Services</h1>
      
      {services.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: '1.2rem' }}>Loading services...</p>
      ) : (
        <div className="services-grid">
          {services.map((service) => (
            <div key={service._id} className="service-card">
              <span className="service-category">{service.category}</span>
              <h2 className="service-title">{service.title}</h2>
              <p className="service-desc">{service.description}</p>
              <div className="service-footer">
                <span className="price">₹{service.price}</span>
                <span className="duration">⏱ {service.duration} mins</span>
              </div>
              {/* Clicking this button opens the modal and sets the active service */}
              <button className="book-btn" onClick={() => setSelectedService(service)}>
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}

      {/* The Booking Modal Overlay */}
      {selectedService && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Book {selectedService.title}</h2>
            
            <form onSubmit={submitBooking} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input name="customerName" placeholder="Full Name" value={bookingData.customerName} onChange={handleInputChange} required style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
              <input name="customerEmail" type="email" placeholder="Email Address" value={bookingData.customerEmail} onChange={handleInputChange} required style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
              <input name="date" type="date" value={bookingData.date} onChange={handleInputChange} required style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
              <input name="time" type="time" value={bookingData.time} onChange={handleInputChange} required style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
              
              <div className="btn-group">
                <button type="button" className="cancel-btn" onClick={() => setSelectedService(null)}>Cancel</button>
                <button type="submit" className="book-btn">Confirm</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;