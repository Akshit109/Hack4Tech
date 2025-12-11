import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';
import './MemberDashboard.css';

export default function MemberDashboard() {
  const { session, profile } = useAuth();
  const navigate = useNavigate();
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [form, setForm] = useState({
    title: '',
    date: '',
    venue: '',
    description: '',
    registration_url: '',
  });

  useEffect(() => {
    if (!session) {
      navigate('/member/login');
      return;
    }
    fetchMyEvents();
  }, [session, navigate]);

  const fetchMyEvents = async () => {
    const { data } = await supabase
      .from('events')
      .select('*')
      .eq('created_by', session.user.id)
      .order('date', { ascending: false });
    setMyEvents(data || []);
    setLoading(false);
  };

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleCreate = async e => {
    e.preventDefault();
    setLoading(true);

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
      fetchMyEvents();
    } else {
      alert('Error creating event: ' + error.message);
    }

    setLoading(false);
  };

  const handleUpdate = async e => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('events')
      .update({
        title: form.title,
        date: form.date,
        venue: form.venue,
        description: form.description,
        registration_url: form.registration_url,
      })
      .eq('id', editingEvent.id);

    if (!error) {
      setForm({
        title: '',
        date: '',
        venue: '',
        description: '',
        registration_url: '',
      });
      setEditingEvent(null);
      setShowForm(false);
      fetchMyEvents();
    } else {
      alert('Error updating event: ' + error.message);
    }

    setLoading(false);
  };

  const handleDelete = async id => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this event?'
    );
    if (!confirmed) return;

    await supabase.from('events').delete().eq('id', id);
    fetchMyEvents();
  };

  const handleEdit = event => {
    setEditingEvent(event);
    setForm({
      title: event.title,
      date: event.date,
      venue: event.venue,
      description: event.description || '',
      registration_url: event.registration_url || '',
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingEvent(null);
    setShowForm(false);
    setForm({
      title: '',
      date: '',
      venue: '',
      description: '',
      registration_url: '',
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="member-dashboard">
      <section className="section">
        <div className="dashboard-header">
          <div>
            <h1 className="section-title">Member Dashboard</h1>
            <p className="section-subtitle">
              Welcome back, {profile?.full_name || 'Member'}! Manage your events
              here.
            </p>
          </div>
          {!showForm && (
            <button
              className="btn-primary"
              onClick={() => setShowForm(true)}
            >
              + Add New Event
            </button>
          )}
        </div>

        {/* Add/Edit Event Form */}
        {showForm && (
          <div className="glass-card event-form-card">
            <div className="form-header">
              <h2>{editingEvent ? 'Edit Event' : 'Add New Event'}</h2>
              <button className="btn-ghost" onClick={handleCancelEdit}>
                Cancel
              </button>
            </div>

            <form
              onSubmit={editingEvent ? handleUpdate : handleCreate}
              className="form-grid"
            >
              <input
                name="title"
                placeholder="Event title *"
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
                placeholder="Venue *"
                value={form.venue}
                onChange={handleChange}
                required
              />
              <input
                name="registration_url"
                placeholder="Registration link (https://...) *"
                value={form.registration_url}
                onChange={handleChange}
                required
              />
              <textarea
                name="description"
                placeholder="Event description *"
                value={form.description}
                onChange={handleChange}
                rows="5"
                required
              />
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading
                  ? 'Saving...'
                  : editingEvent
                  ? 'Update Event'
                  : 'Create Event'}
              </button>
            </form>
          </div>
        )}

        {/* Stats */}
        <div className="stats-container">
          <div className="glass-card stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-value">{myEvents.length}</div>
            <div className="stat-label">Total Events</div>
          </div>
          <div className="glass-card stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-value">
              {myEvents.filter(e => new Date(e.date) >= new Date()).length}
            </div>
            <div className="stat-label">Upcoming Events</div>
          </div>
          <div className="glass-card stat-card">
            <div className="stat-icon">✓</div>
            <div className="stat-value">
              {myEvents.filter(e => new Date(e.date) < new Date()).length}
            </div>
            <div className="stat-label">Past Events</div>
          </div>
        </div>

        {/* Events List */}
        <div className="events-list">
          <h2 className="list-title">Your Events</h2>

          {myEvents.length === 0 ? (
            <div className="glass-card no-events">
              <h3>No events yet</h3>
              <p>Create your first event to get started!</p>
              <button
                className="btn-primary"
                onClick={() => setShowForm(true)}
              >
                + Add Event
              </button>
            </div>
          ) : (
            <div className="events-table-wrapper">
              <table className="events-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Venue</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {myEvents.map(event => (
                    <tr key={event.id}>
                      <td className="event-title-col">{event.title}</td>
                      <td>{new Date(event.date).toLocaleDateString()}</td>
                      <td>{event.venue}</td>
                      <td>
                        {new Date(event.date) >= new Date() ? (
                          <span className="status-badge upcoming">
                            Upcoming
                          </span>
                        ) : (
                          <span className="status-badge past">Past</span>
                        )}
                      </td>
                      <td className="actions-col">
                        <button
                          className="btn-action btn-edit"
                          onClick={() => handleEdit(event)}
                          title="Edit event"
                        >
                          ✏️
                        </button>
                        <button
                          className="btn-action btn-delete"
                          onClick={() => handleDelete(event.id)}
                          title="Delete event"
                        >
                          🗑️
                        </button>
                        <button
                          className="btn-action btn-view"
                          onClick={() => navigate(`/events/${event.id}`)}
                          title="View details"
                        >
                          👁️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
