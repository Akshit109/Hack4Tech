import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Hack4Tech</h3>
          <p>
            A student-led technical community at GLA University empowering
            students with industry-level skills.
          </p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/our-team">Our Team</a>
            </li>
            <li>
              <a href="/upcoming-events">Events</a>
            </li>
            <li>
              <a href="/join-us">Join Us</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>GLA University, Mathura</p>

          <div className="footer-contact-list">
            <a href="mailto:hack4tech@gla.ac.in" className="footer-contact-row">
              <span className="footer-icon-circle mail-icon">✉️</span>
              <span>hack4tech@gla.ac.in</span>
            </a>

            <a
              href="https://linkedin.com/company/hack4tech-glau"
              target="_blank"
              rel="noreferrer"
              className="footer-contact-row"
            >
              <span className="footer-icon-circle linkedin-icon">in</span>
              <span>LinkedIn</span>
            </a>

            <a
              href="https://instagram.com/hack4tech.glau"
              target="_blank"
              rel="noreferrer"
              className="footer-contact-row"
            >
              <span className="footer-icon-circle instagram-icon">IG</span>
              <span>@hack4tech.glau</span>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Hack4Tech · GLA University. All rights reserved.</p>
      </div>
    </footer>
  );
}
