import React from 'react';
import TeamCard from '../components/TeamCard';
import './OurTeam.css';

// Import team images - replace with actual paths
import akshitImg from '../assets/Akshit.jpg';
import ankitImg from '../assets/Ankit.jpg';
import manishImg from '../assets/Manish.jpg';

export default function OurTeam() {
  const leadership = [
    {
      name: 'Akshit Jaiswal',
      role: 'President ',
      img: akshitImg, // Replace with actual image
      linkedin: 'https://linkedin.com/in/akshit109',
      github: 'https://github.com/akshit109',
      email: 'akshit@hack4tech.com',
    },
    {
      name: 'Ankit Saraswat',
      role: 'Vice President',
      img: ankitImg , // Replace with actual image
      linkedin: 'https://linkedin.com/in/ankit-saraswat',
      github: 'https://github.com/ankit-saraswat',
      email: 'ankit@hack4tech.com',
    },{
      name: 'Manish Solankey',
      role: 'Gernal Secatery',
      img: manishImg, // Replace with actual image
      linkedin: 'https://linkedin.com/in/ankit-saraswat',
      github: 'https://github.com/ankit-saraswat',
      email: 'ankit@hack4tech.com',
    },
  ];

  const coreTeam = [
    // {
    //   name: 'Member Name',
    //   role: 'Technical Lead',
    //   img: 'https://via.placeholder.com/150',
    //   linkedin: 'https://linkedin.com/in/member',
    //   github: 'https://github.com/member',
    //   email: 'member@hack4tech.com',
    // },
    // {
    //   name: 'Member Name',
    //   role: 'Technical Lead',
    //   img: 'https://via.placeholder.com/150',
    //   linkedin: 'https://linkedin.com/in/member',
    //   github: 'https://github.com/member',
    //   email: 'member@hack4tech.com',
    // },
    // {
    //   name: 'Member Name',
    //   role: 'Technical Lead',
    //   img: 'https://via.placeholder.com/150',
    //   linkedin: 'https://linkedin.com/in/member',
    //   github: 'https://github.com/member',
    //   email: 'member@hack4tech.com',
    // },
    // Add more core team members here
  ];

  return (
    <div className="our-team-page">
      <section className="section">
        <h1 className="section-title">Our Team</h1>
        <p className="section-subtitle">
          Meet the passionate team driving Hack4Tech at GLA University
        </p>

        {/* Leadership */}
        <div className="leadership-section">
          <h2 className="subsection-title">Core Team</h2>
          <div className="leadership-grid">
            {leadership.map(member => (
              <TeamCard key={member.name} member={member} highlight={true} />
            ))}
          </div>
        </div>

        {/* Core Team */}
        <div className="core-team-section">
          <h2 className="subsection-title"></h2>
          <div className="grid">
            {coreTeam.map(member => (
              <TeamCard key={member.name} member={member} />
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
