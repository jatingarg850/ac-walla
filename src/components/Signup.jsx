import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const result = await signup(username, email, password);
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
            <h2>Join Our Community!</h2>
            <p>Create an account to access premium AC services</p>
          </div>
        </div>
        <div className="auth-form-section">
          <div className="auth-form-container">
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">Start your AC service journey with us</p>
            
            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="auth-input-group">
                <div className="auth-input-icon">
                  <FaUserAlt />
                </div>
                <input
                  type="text"
                  className="auth-input"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

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

              <div className="auth-input-group">
                <div className="auth-input-icon">
                  <FaLock />
                </div>
                <input
                  type="password"
                  className="auth-input"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="auth-submit">
                Sign Up
              </button>

              <p className="auth-redirect">
                Already have an account?{' '}
                <Link to="/login" className="auth-redirect-link">
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup; 