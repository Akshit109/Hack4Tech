import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './Auth.css';

export default function MemberSignup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    full_name: '',
    phone_number: '',
    invite_code: '',
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    // Validate passwords match
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Validate password length
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    // Verify invite code
    const { data: codeData, error: codeError } = await supabase
      .from('invite_codes')
      .select('*')
      .eq('code', form.invite_code.trim())
      .single();

    if (codeError || !codeData) {
      setError('Invalid invite code. Please check and try again.');
      setLoading(false);
      return;
    }

    if (codeData.is_used) {
      setError('This invite code has already been used.');
      setLoading(false);
      return;
    }

    // Create user account
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          full_name: form.full_name,
          phone_number: form.phone_number,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // Create profile entry
    if (data.user) {
      await supabase.from('profiles').insert({
        id: data.user.id,
        full_name: form.full_name,
        phone_number: form.phone_number,
        role: 'member',
      });

      // Mark invite code as used
      await supabase
        .from('invite_codes')
        .update({
          is_used: true,
          used_by: data.user.id,
          used_at: new Date().toISOString(),
        })
        .eq('code', form.invite_code.trim());
    }

    setMessage(
      'Account created successfully! Please check your email to confirm your account.'
    );
    setLoading(false);

    setTimeout(() => {
      navigate('/member/login');
    }, 3000);
  };

  return (
    <div className="auth-page">
      <section className="section">
        <div className="auth-container">
          <div className="glass-card auth-card signup-card">
            <h1>Member Signup</h1>
            <p className="auth-subtitle">
              Create an account to join the Hack4Tech community
            </p>
            <p className="invite-notice">
              ⚠️ You need a valid invite code from an admin to sign up
            </p>

            <form onSubmit={handleSubmit} className="form-grid">
              <input
                type="text"
                name="full_name"
                placeholder="Full name *"
                value={form.full_name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email *"
                value={form.email}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone_number"
                placeholder="Phone number *"
                value={form.phone_number}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password (min 6 characters) *"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password *"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="invite_code"
                placeholder="Invite code (from admin) *"
                value={form.invite_code}
                onChange={handleChange}
                required
              />

              {error && <p className="error-text">{error}</p>}
              {message && <p className="status-text">{message}</p>}

              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Creating account...' : 'Sign Up'}
              </button>
            </form>

            <p className="auth-footer">
              Already have an account?{' '}
              <Link to="/member/login" className="auth-link">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
