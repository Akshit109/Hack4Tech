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
          {/* Address */}
          <div className="glass-card contact-card">
            <div className="contact-icon">📍</div>
            <h3>Address</h3>
            <p>GLA University</p>
            <p>Mathura, Uttar Pradesh</p>
            <p>India - 281406</p>
          </div>

          {/* Email with icon + text */}
          <div className="glass-card contact-card">
            <div className="contact-icon">📧</div>
            <h3>Email</h3>
            <div className="contact-list">
              <a
                href="mailto:hack4tech@gla.ac.in"
                className="contact-row"
              >
                <span className="icon-circle mail-icon">✉️</span>
                <span className="contact-text">hack4tech@gla.ac.in</span>
              </a>
              
              
            </div>
          </div>

          {/* Social media with logos + text */}
          <div className="glass-card contact-card">
            <div className="contact-icon">🔗</div>
            <h3>Social Media</h3>
            <div className="contact-list">
              <a
                href="https://linkedin.com/company/hack4tech-glau"
                target="_blank"
                rel="noreferrer"
                className="contact-row"
              >
                <span className="icon-circle linkedin-icon">in</span>
                <span className="contact-text">LinkedIn</span>
              </a>
              <a
                href="https://instagram.com/hack4tech.glau"
                target="_blank"
                rel="noreferrer"
                className="contact-row"
              >
                <span className="icon-circle instagram-icon">IG</span>
                <span className="contact-text">@hack4tech.glau</span>
              </a>
            </div>
          </div>
        </div>

        {/* Contact form */}
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
