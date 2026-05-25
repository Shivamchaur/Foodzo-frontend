import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register, loading } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await register(name, email, password);
      navigate('/products');
    } catch (err) {
      setError(err.message || 'Unable to register');
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-container">
        <div className="auth-image-side" style={{ background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)' }}>
          <img src="/food_auth_illustration.png" alt="Foodzo Premium Delivery" />
          <h2>Join Foodzo Today</h2>
          <p>Create an account to start ordering delicious meals from your favorite local restaurants.</p>
        </div>
        <div className="auth-form-side">
          <h2>Create an Account</h2>
          <p className="auth-subtitle">Sign up to get started with Foodzo.</p>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Full Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" required />
            </div>
            <div className="input-group">
              <label>Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="hello@example.com" required />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
            </div>
            {error && <p className="form-error">{error}</p>}
            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
          <div className="auth-switch">
            Already have an account? <Link to="/login">Login here</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
