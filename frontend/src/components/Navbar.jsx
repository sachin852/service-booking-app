import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ padding: '15px 40px', background: '#770030', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h2 style={{ color: 'white', margin: 0 }}>Service App</h2>
      <div>
        <Link to="/" style={{ color: 'white', marginRight: '20px', textDecoration: 'none', fontWeight: 'bold' }}>Home</Link>
        <Link to="/admin" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Admin Dashboard</Link>
      </div>
    </nav>
  );
}

export default Navbar;