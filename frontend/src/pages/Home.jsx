import { useState, useEffect } from 'react';
import '../App.css'; 

function Home() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/services')
      .then(response => response.json())
      .then(data => setServices(data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

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
              <button className="book-btn">Book Now</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;