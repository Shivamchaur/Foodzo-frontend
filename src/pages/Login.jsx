import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/products');
    } catch (err) {
      setError(err.message || 'Unable to login');
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-container">
        <div className="auth-image-side">
          <img src="/food_auth_illustration.png" alt="Foodzo Delivery" />
          <h2>Welcome Back!</h2>
          <p>Discover the best food and drinks in your area, delivered hot and fresh to your door.</p>
        </div>
        <div className="auth-form-side">
          <h2>Login to Foodzo</h2>
          <p className="auth-subtitle">Please enter your details to sign in.</p>
          <form onSubmit={handleSubmit}>
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
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <div className="auth-switch">
            Don't have an account? <Link to="/register">Register here</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
