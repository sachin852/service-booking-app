import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const customer = JSON.parse(localStorage.getItem('customer'));
  const isAdmin = localStorage.getItem('isAdmin');

  const handleLogout = () => {
    localStorage.removeItem('customer');
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

  return (
    <nav style={{ padding: '15px 40px', background: '#2c3e50', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h2 style={{ color: 'white', margin: 0 }}>Service App</h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Home</Link>
        <Link to="/my-bookings" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>My Bookings</Link>
        
        {isAdmin && (
          <Link to="/admin" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Admin Dashboard</Link>
        )}

        {!customer && !isAdmin ? (
          <Link to="/login" style={{ background: '#27ae60', color: 'white', padding: '8px 15px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold' }}>Login / Signup</Link>
        ) : (
          <button onClick={handleLogout} style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Logout</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;