import React from 'react';
import './TeamCard.css';

export default function TeamCard({ member, highlight = false }) {
  if (!member) return null;

  const { name, role, img, linkedin, github, email } = member;

  return (
    <div
      className={`glass-card team-card ${
        highlight ? 'team-card-highlight' : ''
      }`}
    >
      {img && (
        <div className="team-avatar-wrapper">
          <img src={img} alt={name} className="team-avatar" />
        </div>
      )}

      <h3 className="team-name">{name}</h3>
      <p className="team-role">{role}</p>

      <div className="team-links">
        {linkedin && (
          <a
            href={linkedin}
            className="team-link team-link-linkedin"
            target="_blank"
            rel="noreferrer"
            title="LinkedIn"
          >
            in
          </a>
        )}
        {github && (
          <a
            href={github}
            className="team-link team-link-github"
            target="_blank"
            rel="noreferrer"
            title="GitHub"
          >
            gh
          </a>
        )}
        {email && (
          <a href={`mailto:${email}`} className="team-link team-link-email" title="Email">
            @
          </a>
        )}
      </div>
    </div>
  );
}
