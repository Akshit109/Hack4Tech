import React from 'react';
import TeamCard from '../components/TeamCard';
import './OurTeam.css';

// Import team images
import akshitImg from '../assets/Akshit.jpg';
import ankitImg from '../assets/Ankit.jpg';
import manishImg from '../assets/Manish.jpg';
import mentorImg from '../assets/Mentor.jpg'; // add your mentor image

export default function OurTeam() {
  const leadership = [
    {
      name: 'Akshit Jaiswal',
      role: 'President',
      img: akshitImg,
      linkedin: 'https://linkedin.com/in/akshit109',
      email: 'jaiswalakshit4@gmail.com',
    },
    {
      name: 'Ankit Saraswat',
      role: 'Vice President',
      img: ankitImg,
      linkedin: 'https://linkedin.com/in/shortsays',
      email: 'ankitsaraswatyt@gmail.com',
    },
    {
      name: 'Manish Solankey',
      role: 'General Secretary',
      img: manishImg,
      linkedin: 'https://linkedin.com/in/manish-chaudhary-4569bb276',
      email: 'singhkarmveer18499@gmail.com',
    },
  ];

  const mentor = {
    name: 'Dr. Shobhit Sachan',
    qualification: 'Assistant Professor, CSE Dept.',
    designation: 'Faculty Mentor, Hack4Tech',
    img: mentorImg,
    email: 'shobhitsachan@gmail.com',
  };

  const coreTeam = [
    // add more members later
  ];

  return (
    <div className="our-team-page">
      <section className="section">
        <h1 className="section-title">Our Team</h1>
        <p className="section-subtitle">
          Meet the passionate team driving Hack4Tech at GLA University
        </p>

        {/* Mentor Section */}
        <div className="mentor-section glass-card">
          <div className="mentor-avatar-wrapper">
            <img
              src={mentor.img}
              alt={mentor.name}
              className="mentor-avatar"
            />
          </div>
          <div className="mentor-info">
            <h2 className="mentor-name">{mentor.name}</h2>
            <p className="mentor-designation">{mentor.designation}</p>
            <p className="mentor-qualification">{mentor.qualification}</p>
            <a href={`mailto:${mentor.email}`} className="mentor-email">
              {mentor.email}
            </a>
          </div>
        </div>

        {/* Leadership */}
        <div className="leadership-section">
          <h2 className="subsection-title">Core Team</h2>
          <div className="leadership-grid">
            {leadership.map(member => (
              <TeamCard key={member.name} member={member} highlight />
            ))}
          </div>
        </div>

        
        {/* Join CTA */}
        <div className="team-cta glass-card">
          <h3>Want to join our core team?</h3>
          <p>
            We're always looking for passionate students to help organize events
            and lead initiatives.
          </p>
          <a href="/join-us" className="btn-primary">
            Apply Now
          </a>
        </div>
      </section>
    </div>
  );
}
