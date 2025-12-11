import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const { session } = useAuth();
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [joinRequests, setJoinRequests] = useState([]);
  const [inviteCodes, setInviteCodes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [codeCount, setCodeCount] = useState(10);

  useEffect(() => {
    fetchUsers();
    fetchEvents();
    fetchJoinRequests();
    fetchInviteCodes();
  }, []);

  const fetchUsers = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    setUsers(data || []);
  };

  const fetchEvents = async () => {
    const { data } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: false });
    setEvents(data || []);
  };

  const fetchJoinRequests = async () => {
    const { data } = await supabase
      .from('join_us')
      .select('*')
      .order('created_at', { ascending: false });
    setJoinRequests(data || []);
  };

  const fetchInviteCodes = async () => {
    const { data } = await supabase
      .from('invite_codes')
      .select('*')
      .order('created_at', { ascending: false });
    setInviteCodes(data || []);
  };

  const generateRandomCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'H4T-';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleGenerateCodes = async () => {
    if (!session) return;
    setLoading(true);

    const newCodes = [];
    for (let i = 0; i < codeCount; i++) {
      newCodes.push({
        code: generateRandomCode(),
        created_by: session.user.id,
        is_used: false,
      });
    }

    const { error } = await supabase.from('invite_codes').insert(newCodes);

    if (error) {
      alert('Error generating codes: ' + error.message);
    } else {
      alert(`${codeCount} invite codes generated successfully!`);
      fetchInviteCodes();
    }

    setLoading(false);
  };

  const handleDeleteCode = async codeId => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this invite code?'
    );
    if (!confirmed) return;

    await supabase.from('invite_codes').delete().eq('id', codeId);
    fetchInviteCodes();
  };

  const handleRoleChange = async (userId, newRole) => {
    setLoading(true);
    await supabase.from('profiles').update({ role: newRole }).eq('id', userId);
    fetchUsers();
    setLoading(false);
  };

  const handleDeleteEvent = async eventId => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this event?'
    );
    if (!confirmed) return;

    await supabase.from('events').delete().eq('id', eventId);
    fetchEvents();
  };

  const handleDeleteJoinRequest = async requestId => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this application?'
    );
    if (!confirmed) return;

    await supabase.from('join_us').delete().eq('id', requestId);
    fetchJoinRequests();
  };

  const handlePasswordReset = async email => {
    const confirmed = window.confirm(`Send password reset email to ${email}?`);
    if (!confirmed) return;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      alert('Error: ' + error.message);
    } else {
      alert('Password reset email sent successfully!');
    }
  };

  const filteredUsers = users.filter(
    user =>
      user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const unusedCodes = inviteCodes.filter(code => !code.is_used);
  const usedCodes = inviteCodes.filter(code => code.is_used);

  return (
    <div className="admin-dashboard">
      <section className="section">
        <h1 className="section-title">Admin Dashboard</h1>
        <p className="section-subtitle">
          Manage users, events, invite codes, and core team applications
        </p>

        {/* Tabs */}
        <div className="dashboard-tabs">
          <button
            className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Users ({users.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'codes' ? 'active' : ''}`}
            onClick={() => setActiveTab('codes')}
          >
            Invite Codes ({unusedCodes.length} unused)
          </button>
          <button
            className={`tab-btn ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            Events ({events.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'join' ? 'active' : ''}`}
            onClick={() => setActiveTab('join')}
          >
            Join Requests ({joinRequests.length})
          </button>
        </div>

        {/* Invite Codes Tab */}
        {activeTab === 'codes' && (
          <div className="glass-card dashboard-content">
            <div className="content-header">
              <h2>Invite Code Management</h2>
            </div>

            <div className="code-generator">
              <h3>Generate New Codes</h3>
              <div className="generator-controls">
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={codeCount}
                  onChange={e => setCodeCount(Number(e.target.value))}
                  className="code-count-input"
                />
                <button
                  className="btn-primary"
                  onClick={handleGenerateCodes}
                  disabled={loading}
                >
                  {loading ? 'Generating...' : `Generate ${codeCount} Codes`}
                </button>
              </div>
            </div>

            <div className="codes-section">
              <h3>Unused Codes ({unusedCodes.length})</h3>
              <div className="codes-grid">
                {unusedCodes.map(code => (
                  <div key={code.id} className="glass-card code-card unused">
                    <div className="code-text">{code.code}</div>
                    <div className="code-meta">
                      Created: {new Date(code.created_at).toLocaleDateString()}
                    </div>
                    <button
                      className="btn-ghost btn-sm btn-delete"
                      onClick={() => handleDeleteCode(code.id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
              {unusedCodes.length === 0 && (
                <p className="no-data">No unused codes available</p>
              )}
            </div>

            <div className="codes-section">
              <h3>Used Codes ({usedCodes.length})</h3>
              <div className="codes-grid">
                {usedCodes.map(code => (
                  <div key={code.id} className="glass-card code-card used">
                    <div className="code-text">{code.code}</div>
                    <div className="code-meta">
                      Used: {new Date(code.used_at).toLocaleDateString()}
                    </div>
                    <div className="code-status">✓ Used</div>
                  </div>
                ))}
              </div>
              {usedCodes.length === 0 && (
                <p className="no-data">No codes have been used yet</p>
              )}
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="glass-card dashboard-content">
            <div className="content-header">
              <h2>User Management</h2>
              <input
                type="text"
                placeholder="Search users..."
                className="search-input"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user.id}>
                      <td>{user.full_name || 'N/A'}</td>
                      <td>{user.phone_number || 'N/A'}</td>
                      <td>
                        <select
                          value={user.role}
                          onChange={e =>
                            handleRoleChange(user.id, e.target.value)
                          }
                          className="role-select"
                          disabled={loading}
                        >
                          <option value="member">Member</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td>
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td>
                        <button
                          className="btn-ghost btn-sm"
                          onClick={() => handlePasswordReset(user.id)}
                        >
                          Reset Password
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredUsers.length === 0 && (
                <p className="no-data">No users found</p>
              )}
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div className="glass-card dashboard-content">
            <div className="content-header">
              <h2>Event Management</h2>
            </div>

            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Venue</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map(event => (
                    <tr key={event.id}>
                      <td>{event.title}</td>
                      <td>{new Date(event.date).toLocaleDateString()}</td>
                      <td>{event.venue}</td>
                      <td>
                        {new Date(event.created_at).toLocaleDateString()}
                      </td>
                      <td>
                        <button
                          className="btn-ghost btn-sm btn-delete"
                          onClick={() => handleDeleteEvent(event.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {events.length === 0 && <p className="no-data">No events yet</p>}
            </div>
          </div>
        )}

        {/* Join Requests Tab */}
        {activeTab === 'join' && (
          <div className="glass-card dashboard-content">
            <div className="content-header">
              <h2>Core Team Applications</h2>
            </div>

            <div className="join-requests-grid">
              {joinRequests.map(request => (
                <div key={request.id} className="glass-card request-card">
                  <div className="request-header">
                    <h3>{request.name}</h3>
                    <button
                      className="btn-ghost btn-sm btn-delete"
                      onClick={() => handleDeleteJoinRequest(request.id)}
                    >
                      Delete
                    </button>
                  </div>

                  <div className="request-details">
                    <p>
                      <strong>Course:</strong> {request.course}
                    </p>
                    <p>
                      <strong>Year:</strong> {request.year}
                    </p>
                    <p>
                      <strong>Email:</strong>{' '}
                      <a href={`mailto:${request.email}`}>{request.email}</a>
                    </p>
                    <p>
                      <strong>Contact:</strong> {request.contact_number}
                    </p>
                    <p>
                      <strong>About:</strong>
                    </p>
                    <p className="about-text">{request.about}</p>
                    <p className="request-date">
                      Applied on:{' '}
                      {new Date(request.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}

              {joinRequests.length === 0 && (
                <p className="no-data">No applications yet</p>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
