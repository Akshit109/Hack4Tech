import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './Auth.css';

export default function MemberLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate('/events');
    }
  };

  return (
    <div className="auth-page">
      <section className="section">
        <div className="auth-container">
          <div className="glass-card auth-card">
            <h1>Member Login</h1>
            <p className="auth-subtitle">
              Sign in to access events and community features
            </p>

            <form onSubmit={handleSubmit} className="form-grid">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />

              {error && <p className="error-text">{error}</p>}

              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <p className="auth-footer">
              Don't have an account?{' '}
              <Link to="/member/signup" className="auth-link">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
