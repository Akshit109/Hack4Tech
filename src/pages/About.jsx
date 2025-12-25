import React from 'react';
import './About.css';

export default function About() {
  return (
    <div className="about-page">
      <section className="section">
        <h1 className="section-title">About Hack4Tech</h1>
        <p className="section-subtitle">
          A student-led technical community at GLA University
        </p>

        <div className="about-content">
          <div className="glass-card about-card">
            <h2>Our Mission</h2>
            <p>
              Hack4Tech is a technical community with the vision to empower
              students with industry-level tools, skills, and strategies to excel
              in hackathons and real-world problem-solving. Our aim is to create
              an ecosystem where students can learn collaboratively, innovate, and
              represent GLA University at national and international hackathons
              with excellence.
            </p>
          </div>

          <div className="glass-card about-card">
            <h2>What We Do</h2>
            <div className="activities-grid">
              <div className="activity-section">
                <h3>🎓 Workshops & Training</h3>
                <ul>
                  <li>GitHub & Git Bash</li>
                  <li>Web Development (Frontend & Backend)</li>
                  <li>Emerging technologies (APIs, Cloud Platforms)</li>
                  <li>Team Collaboration and Project Management Tools</li>
                </ul>
              </div>

              <div className="activity-section">
                <h3>🚀 Hackathon Bootcamps</h3>
                <ul>
                  <li>Simulated hackathons within campus</li>
                  <li>Real-time experience and practice</li>
                  <li>Guidance on ideation and pitching</li>
                  <li>Project building mentorship</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="glass-card about-card">
            <h2>Impact at GLA University</h2>
            <div className="impact-grid">
              <div className="impact-item">
                <div className="impact-icon">🎯</div>
                <p>Building a strong technical culture and innovation mindset</p>
              </div>
              <div className="impact-item">
                <div className="impact-icon">🏆</div>
                <p>Representation in national and international hackathons</p>
              </div>
              <div className="impact-item">
                <div className="impact-icon">💼</div>
                <p>Preparing students for industry readiness</p>
              </div>
              <div className="impact-item">
                <div className="impact-icon">🤝</div>
                <p>Encouraging teamwork, leadership, and community growth</p>
              </div>
            </div>
          </div>

          <div className="glass-card about-card stats-card">
            <div className="stat">
              <div className="stat-number">30+</div>
              <div className="stat-label">Active Members</div>
            </div>
            <div className="stat">
              <div className="stat-number">10+</div>
              <div className="stat-label">Workshops Conducted</div>
            </div>
            <div className="stat">
              <div className="stat-number">5+</div>
              <div className="stat-label">Hackathons Participated</div>
            </div>
          </div>
        </div>
        <meta name="google-adsense-account" content="ca-pub-7140299732960570"></meta>
      </section>
    </div>
  );
}
