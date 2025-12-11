import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import './JoinUs.css';

export default function JoinUs() {
  const [form, setForm] = useState({
    name: '',
    course: '',
    year: '',
    contact_number: '',
    email: '',
    about: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    const { error } = await supabase.from('join_us').insert(form);

    if (error) {
      setStatus({
        type: 'error',
        message: 'Something went wrong. Please try again.',
      });
    } else {
      setStatus({
        type: 'success',
        message:
          'Application submitted successfully! We will get back to you soon.',
      });
      setForm({
        name: '',
        course: '',
        year: '',
        contact_number: '',
        email: '',
        about: '',
      });
    }

    setLoading(false);
  };

  return (
    <div className="join-us-page">
      <section className="section">
        <div className="join-us-container">
          <div className="join-us-left">
            <h1 className="section-title">Join Our Core Team</h1>
            <p className="join-us-description">
              Become part of Hack4Tech and help lead the technical revolution at
              GLA University.
            </p>

            <div className="benefits-list">
              <h3>What You'll Do</h3>
              <ul>
                <li>Organize workshops and bootcamps</li>
                <li>Lead hackathon teams</li>
                <li>Mentor junior students</li>
                <li>Collaborate with industry experts</li>
                <li>Build your leadership portfolio</li>
              </ul>

              <h3>What You'll Gain</h3>
              <ul>
                <li>Industry-level technical skills</li>
                <li>Leadership experience</li>
                <li>Networking opportunities</li>
                <li>Recognition and certificates</li>
                <li>Portfolio projects</li>
              </ul>
            </div>
          </div>

          <div className="join-us-right">
            <div className="glass-card join-form-card">
              <h2>Application Form</h2>
              <p className="form-subtitle">
                Tell us about yourself and why you want to join
              </p>

              <form onSubmit={handleSubmit} className="form-grid">
                <input
                  name="name"
                  placeholder="Full name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <input
                  name="course"
                  placeholder="Course (e.g., B.Tech CSE)"
                  value={form.course}
                  onChange={handleChange}
                  required
                />
                <input
                  name="year"
                  placeholder="Year (e.g., 2nd Year)"
                  value={form.year}
                  onChange={handleChange}
                  required
                />
                <input
                  name="contact_number"
                  placeholder="Contact number"
                  value={form.contact_number}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email ID"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="about"
                  placeholder="Describe yourself and why you want to join Hack4Tech (skills, interests, motivations)"
                  value={form.about}
                  onChange={handleChange}
                  rows="6"
                  required
                />
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit Application'}
                </button>

                {status.message && (
                  <p
                    className={
                      status.type === 'success' ? 'status-text' : 'error-text'
                    }
                  >
                    {status.message}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
