import React from 'react';
import './Contact.css';

export default function Contact() {
  return (
    <div className="contact-page">
      <section className="section">
        <h1 className="section-title">Contact Us</h1>
        <p className="section-subtitle">
          Get in touch with the Hack4Tech team
        </p>

        <div className="contact-grid">
          <div className="glass-card contact-card">
            <div className="contact-icon">📍</div>
            <h3>Address</h3>
            <p>GLA University</p>
            <p>Mathura, Uttar Pradesh</p>
            <p>India - 281406</p>
          </div>

          <div className="glass-card contact-card">
            <div className="contact-icon">📧</div>
            <h3>Email</h3>
            <p>
              <a href="mailto:hack4tech@gla.ac.in">hack4tech@gla.ac.in</a>
            </p>
            <p>
              <a href="mailto:info@hack4tech.com">info@hack4tech.com</a>
            </p>
          </div>

          <div className="glass-card contact-card">
            <div className="contact-icon">🔗</div>
            <h3>Social Media</h3>
            <div className="social-links">
              <a
                href="https://linkedin.com/company/hack4tech"
                target="_blank"
                rel="noreferrer"
                className="social-link"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/hack4tech"
                target="_blank"
                rel="noreferrer"
                className="social-link"
              >
                GitHub
              </a>
              <a
                href="https://instagram.com/hack4tech"
                target="_blank"
                rel="noreferrer"
                className="social-link"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="glass-card contact-form-card">
          <h2>Send us a message</h2>
          <form className="contact-form">
            <div className="form-row">
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
            </div>
            <input type="text" placeholder="Subject" required />
            <textarea placeholder="Your Message" rows="6" required></textarea>
            <button type="submit" className="btn-primary">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
