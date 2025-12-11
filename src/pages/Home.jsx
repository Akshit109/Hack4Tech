import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import EventCard from '../components/EventCard';
import './Home.css';

export default function Home() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    supabase
      .from('events')
      .select('*')
      .gte('date', new Date().toISOString().split('T')[0])
      .order('date', { ascending: true })
      .limit(3)
      .then(({ data }) => setUpcomingEvents(data || []));
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            Student-led Tech Community · GLA University
          </div>
          <h1 className="hero-title">
            Hack<span className="hero-accent">4</span>Tech
          </h1>
          <p className="hero-tagline">Build. Break. Innovate.</p>
          <p className="hero-description">
            Empowering students with industry-level tools, skills, and strategies
            to excel in hackathons and real-world problem-solving.
          </p>
          <div className="hero-cta">
            <Link to="/upcoming-events" className="btn-primary btn-lg">
              Explore Events
            </Link>
            <Link to="/join-us" className="btn-ghost btn-lg">
              Join Core Team
            </Link>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-card hero-card-1">
            <span className="card-icon">💻</span>
            <span>Workshops</span>
          </div>
          <div className="hero-card hero-card-2">
            <span className="card-icon">🚀</span>
            <span>Bootcamps</span>
          </div>
          <div className="hero-card hero-card-3">
            <span className="card-icon">🏆</span>
            <span>Hackathons</span>
          </div>
        </div>
      </section>

      {/* Why Hack4Tech Section */}
      <section className="section why-section">
        <h2 className="section-title">Why Hack4Tech?</h2>
        <p className="section-subtitle">
          Building a strong technical culture at GLA University
        </p>

        <div className="grid">
          <div className="glass-card feature-card">
            <div className="feature-icon">📚</div>
            <h3>Workshops & Training</h3>
            <p>
              Master Git/GitHub, web development, APIs, cloud platforms, and
              emerging technologies relevant to hackathons.
            </p>
          </div>

          <div className="glass-card feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Hackathon Bootcamps</h3>
            <p>
              Simulated hackathons, real-time experience, guidance on ideation,
              pitching, and project building.
            </p>
          </div>

          <div className="glass-card feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Real-world Skills</h3>
            <p>
              Industry readiness with practical skills, teamwork, leadership, and
              community-driven growth.
            </p>
          </div>

          <div className="glass-card feature-card">
            <div className="feature-icon">🌟</div>
            <h3>GLA Representation</h3>
            <p>
              Represent GLA University at national and international hackathons
              with excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Events Teaser */}
      {upcomingEvents.length > 0 && (
        <section className="section events-teaser">
          <h2 className="section-title">Upcoming Events</h2>
          <p className="section-subtitle">
            Join us in our next workshops and bootcamps
          </p>

          <div className="grid">
            {upcomingEvents.map(event => (
              <EventCard key={event.id} event={event} canDelete={false} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/upcoming-events" className="btn-primary">
              View All Events
            </Link>
          </div>
        </section>
      )}

      {/* Join Us Teaser */}
      <section className="section join-teaser">
        <div className="glass-card join-teaser-card">
          <h2>Want to build the next big project from GLA?</h2>
          <p>
            Join the Hack4Tech core team and help organize workshops, bootcamps,
            and lead hackathon teams.
          </p>
          <Link to="/join-us" className="btn-primary btn-lg">
            Apply Now
          </Link>
        </div>
      </section>
    </div>
  );
}
