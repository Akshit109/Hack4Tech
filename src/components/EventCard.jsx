import React from 'react';
import { Link } from 'react-router-dom';
import './EventCard.css';

export default function EventCard({ event, canDelete, onDelete }) {
  if (!event) return null;

  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="glass-card event-card">
      <div className="event-header">
        <h3 className="event-title">{event.title}</h3>
        <span className="event-date-chip">{formatDate(event.date)}</span>
      </div>

      <p className="event-venue">📍 {event.venue}</p>

      <div className="event-actions">
        <Link to={`/events/${event.id}`} className="btn-primary">
          Explore
        </Link>
        {canDelete && (
          <button
            type="button"
            className="btn-ghost btn-delete"
            onClick={() => onDelete(event.id)}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
