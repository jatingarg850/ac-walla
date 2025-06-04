import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login(email, password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-image-section">
          <img 
            src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80" 
            alt="AC Service" 
            className="auth-image" 
          />
          <div className="auth-image-overlay">
            <h2>Welcome Back!</h2>
            <p>Your trusted partner in AC services</p>
          </div>
        </div>
        <div className="auth-form-section">
          <div className="auth-form-container">
            <h1 className="auth-title">Sign In</h1>
            <p className="auth-subtitle">Access your AC service account</p>
            
            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="auth-input-group">
                <div className="auth-input-icon">
                  <MdEmail />
                </div>
                <input
                  type="email"
                  className="auth-input"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="auth-input-group">
                <div className="auth-input-icon">
                  <FaLock />
                </div>
                <input
                  type="password"
                  className="auth-input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="auth-options">
                <label className="auth-remember">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <Link to="/forgot-password" className="auth-forgot">
                  Forgot Password?
                </Link>
              </div>

              <button type="submit" className="auth-submit">
                Sign In
              </button>

              <p className="auth-redirect">
                Don't have an account?{' '}
                <Link to="/signup" className="auth-redirect-link">
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 