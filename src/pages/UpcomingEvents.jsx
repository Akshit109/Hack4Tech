import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import EventCard from '../components/EventCard';
import { useAuth } from '../context/AuthContext';
import './UpcomingEvents.css';

export default function UpcomingEvents() {
  const { session, profile } = useAuth();
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    const today = new Date().toISOString().split('T')[0];
    const { data } = await supabase
      .from('events')
      .select('*')
      .gte('date', today)
      .order('date', { ascending: true });
    setEvents(data || []);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

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
    <div className="upcoming-events-page">
      <section className="section">
        <h1 className="section-title">Upcoming Events</h1>
        <p className="section-subtitle">
          Join us in our next workshops, bootcamps, and hackathons
        </p>

        {events.length === 0 ? (
          <div className="no-events">
            <p>No upcoming events scheduled. Stay tuned!</p>
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
