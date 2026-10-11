import { useState, useEffect } from 'react';

function App() {
  const [services, setServices] = useState([]);

  // This asks your backend for the data as soon as the page loads
  useEffect(() => {
    fetch('http://localhost:5000/api/services')
      .then(response => response.json())
      .then(data => setServices(data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Available Services</h1>
      
      {services.length === 0 ? (
        <p>Loading services...</p>
      ) : (
        services.map((service) => (
          <div key={service._id} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '15px', borderRadius: '8px' }}>
            <h2>{service.title}</h2>
            <p>{service.description}</p>
            <p><strong>Price:</strong> ₹{service.price}</p>
            <p><strong>Duration:</strong> {service.duration} mins</p>
            <span style={{ background: '#eee', padding: '5px 10px', borderRadius: '15px', fontSize: '14px' }}>
              {service.category}
            </span>
          </div>
        ))
      )}
    </div>
  );
}

export default App;