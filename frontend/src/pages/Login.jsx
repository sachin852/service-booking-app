import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import '../App.css';

function Login() {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Store customer session in localStorage
      const customer = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL
      };
      localStorage.setItem('customer', JSON.stringify(customer));
      
      alert(`Welcome, ${user.displayName}!`);
      navigate('/');
    } catch (error) {
      console.error("Google Login Error:", error);
      alert("Google Sign-In failed. Please try again.");
    }
  };

  const handleAdminAuth = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin');
    } else {
      alert('Incorrect Admin Password!');
      setPassword('');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '400px', marginTop: '50px', textAlign: 'center' }}>
      {/* Mode Switcher Tabs */}
      <div style={{ display: 'flex', marginBottom: '25px', background: '#f1f2f6', borderRadius: '8px', padding: '5px' }}>
        <button 
          onClick={() => setIsAdminMode(false)} 
          style={{ flex: 1, padding: '10px', background: !isAdminMode ? '#2c3e50' : 'transparent', color: !isAdminMode ? '#fff' : '#2c3e50', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Customer Portal
        </button>
        <button 
          onClick={() => setIsAdminMode(true)} 
          style={{ flex: 1, padding: '10px', background: isAdminMode ? '#2c3e50' : 'transparent', color: isAdminMode ? '#fff' : '#2c3e50', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Admin Login
        </button>
      </div>

      {!isAdminMode ? (
        <div>
          <h2 style={{ color: '#2c3e50', marginBottom: '15px' }}>Customer Login</h2>
          <p style={{ color: '#7f8c8d', marginBottom: '25px', fontSize: '0.95rem' }}>
            Sign in quickly and securely with your Google account to book and track services.
          </p>
          <button 
            onClick={handleGoogleLogin} 
            style={{ 
              width: '100%', 
              padding: '12px', 
              background: '#ffffff', 
              color: '#333333', 
              border: '1px solid #ccc', 
              borderRadius: '6px', 
              cursor: 'pointer', 
              fontWeight: 'bold', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '10px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>🌐</span> Continue with Google
          </button>
        </div>
      ) : (
        <div>
          <h2 style={{ color: '#2c3e50', marginBottom: '20px' }}>Admin Dashboard Login</h2>
          <form onSubmit={handleAdminAuth} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input 
              type="password" 
              placeholder="Admin Password (admin123)" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ccc' }} 
            />
            <button type="submit" className="book-btn">Login as Admin</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;