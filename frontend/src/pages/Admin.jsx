import { useState } from 'react';
import '../App.css'; 

function Admin() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    category: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Send the form data to your backend
    fetch('http://localhost:5000/api/services', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(() => {
        alert('Service saved successfully!');
        // Clear the form after saving
        setFormData({ title: '', description: '', price: '', duration: '', category: '' });
      })
      .catch(error => console.error("Error saving service:", error));
  };

  return (
    <div className="container">
      <h1 className="header">Add New Service</h1>
      
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          name="title" 
          placeholder="Service Title (e.g., SEO Audit)" 
          value={formData.title} 
          onChange={handleChange} 
          required 
          style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ccc' }} 
        />
        <textarea 
          name="description" 
          placeholder="Detailed Description" 
          value={formData.description} 
          onChange={handleChange} 
          required 
          rows="4"
          style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ccc' }} 
        />
        <input 
          name="price" 
          type="number" 
          placeholder="Price (₹)" 
          value={formData.price} 
          onChange={handleChange} 
          required 
          style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ccc' }} 
        />
        <input 
          name="duration" 
          type="number" 
          placeholder="Duration (minutes)" 
          value={formData.duration} 
          onChange={handleChange} 
          required 
          style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ccc' }} 
        />
        <input 
          name="category" 
          placeholder="Category (e.g., Marketing, Development)" 
          value={formData.category} 
          onChange={handleChange} 
          required 
          style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ccc' }} 
        />
        
        <button type="submit" className="book-btn">Save Service</button>
      </form>
    </div>
  );
}

export default Admin;