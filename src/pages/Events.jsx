import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';
import EventCard from '../components/EventCard';
import './Events.css';

export default function Events() {
  const { session, profile } = useAuth();
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: '',
    date: '',
    venue: '',
    description: '',
    registration_url: '',
  });

  const fetchEvents = async () => {
    const { data } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: false });
    setEvents(data || []);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleCreate = async e => {
    e.preventDefault();
    if (!session) return;

    const { error } = await supabase.from('events').insert({
      ...form,
      created_by: session.user.id,
    });

    if (!error) {
      setForm({
        title: '',
        date: '',
        venue: '',
        description: '',
        registration_url: '',
      });
      setShowForm(false);
      fetchEvents();
    }
  };

  const handleDelete = async id => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this event?'
    );
    if (!confirmed) return;

    await supabase.from('events').delete().eq('id', id);
    fetchEvents();
  };

  const canDelete = event => {
    if (!profile || !session) return false;
    return profile.role === 'admin' || event.created_by === session.user.id;
  };

  return (
    <div className="events-page">
      <section className="section">
        <div className="events-header">
          <div>
            <h1 className="section-title">Explore Events</h1>
            <p className="section-subtitle">
              Discover upcoming workshops, bootcamps, and hackathons
            </p>
          </div>

          {session && (
            <button
              className="btn-primary"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? 'Cancel' : '+ Add Event'}
            </button>
          )}
        </div>

        {/* Add Event Form */}
        {showForm && session && (
          <div className="glass-card event-create-form">
            <h2>Add New Event</h2>
            <form onSubmit={handleCreate} className="form-grid">
              <input
                name="title"
                placeholder="Event title"
                value={form.title}
                onChange={handleChange}
                required
              />
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
              />
              <input
                name="venue"
                placeholder="Venue"
                value={form.venue}
                onChange={handleChange}
                required
              />
              <input
                name="registration_url"
                placeholder="Registration link (https://...)"
                value={form.registration_url}
                onChange={handleChange}
                required
              />
              <textarea
                name="description"
                placeholder="Describe the event"
                value={form.description}
                onChange={handleChange}
                rows="4"
                required
              />
              <button type="submit" className="btn-primary">
                Create Event
              </button>
            </form>
          </div>
        )}

        {/* Events Grid */}
        {events.length === 0 ? (
          <div className="no-events">
            <p>No events yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid">
            {events.map(event => (
              <EventCard
                key={event.id}
                event={event}
                canDelete={canDelete(event)}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
