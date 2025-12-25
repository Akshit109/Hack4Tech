import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './Auth.css';

export default function AdminLogin() {
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

    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // Check if user is admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single();

    if (profile?.role !== 'admin') {
      setError('You do not have admin access.');
      await supabase.auth.signOut();
      setLoading(false);
    } else {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="auth-page">
      <section className="section">
        <div className="auth-container">
          <div className="glass-card auth-card admin-card">
            <div className="admin-badge">Admin Access Only</div>
            <h1>Admin Login</h1>
            <p className="auth-subtitle">
              Sign in to access the admin dashboard
            </p>
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7140299732960570"
     crossorigin="anonymous"></script>

            <form onSubmit={handleSubmit} className="form-grid">
              <input
                type="email"
                name="email"
                placeholder="Admin email"
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
                {loading ? 'Verifying...' : 'Sign In as Admin'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
