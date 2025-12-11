import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';
import './EventDetail.css';

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { session, profile } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data, error }) => {
        if (error) {
          navigate('/events');
        } else {
          setEvent(data);
        }
        setLoading(false);
      });
  }, [id, navigate]);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this event?'
    );
    if (!confirmed) return;

    await supabase.from('events').delete().eq('id', id);
    navigate('/events');
  };

  const canDelete =
    profile &&
    session &&
    (profile.role === 'admin' || event?.created_by === session.user.id);

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading event details...</p>
      </div>
    );
  }

  if (!event) return null;

  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="event-detail-page">
      <section className="section">
        <button className="back-btn" onClick={() => navigate('/events')}>
          ← Back to Events
        </button>

        <div className="glass-card event-detail-card">
          <div className="event-detail-header">
            <h1>{event.title}</h1>
            {canDelete && (
              <button className="btn-ghost btn-delete" onClick={handleDelete}>
                Delete Event
              </button>
            )}
          </div>

          <div className="event-detail-meta">
            <div className="meta-item">
              <span className="meta-icon">📅</span>
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="meta-item">
              <span className="meta-icon">📍</span>
              <span>{event.venue}</span>
            </div>
          </div>

          <div className="event-detail-description">
            <h2>About This Event</h2>
            <p>{event.description}</p>
          </div>

          {event.registration_url && (
            <div className="event-detail-cta">
              <a
                href={event.registration_url}
                target="_blank"
                rel="noreferrer"
                className="btn-primary btn-lg"
              >
                Register Now →
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
