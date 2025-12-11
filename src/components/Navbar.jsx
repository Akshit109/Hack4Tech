import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
    const { session, profile, signOut } = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
        setMenuOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    Hack<span className="logo-accent">4</span>Tech
                </Link>

                <button
                    className="navbar-toggle"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    ☰
                </button>

                <ul className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
                    <li>
                        <Link to="/" onClick={() => setMenuOpen(false)}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" onClick={() => setMenuOpen(false)}>
                            About
                        </Link>
                    </li>
                    <li>
                        <Link to="/our-team" onClick={() => setMenuOpen(false)}>
                            Our Team
                        </Link>
                    </li>
                    <li>
                        <Link to="/upcoming-events" onClick={() => setMenuOpen(false)}>
                            Events
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" onClick={() => setMenuOpen(false)}>
                            Contact
                        </Link>
                    </li>
                    <li>
                        <Link to="/join-us" onClick={() => setMenuOpen(false)}>
                            Join Us
                        </Link>
                    </li>

                    {!session && (
                        <>
                            <li>
                                <Link
                                    to="/member/login"
                                    className="nav-btn"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Member Login
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/admin/login"
                                    className="nav-btn"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Admin
                                </Link>
                            </li>
                        </>
                    )}

                    {session && profile?.role === 'member' && (
                        <li>
                            <Link
                                to="/member/dashboard"
                                className="nav-btn"
                                onClick={() => setMenuOpen(false)}
                            >
                                Dashboard
                            </Link>
                        </li>
                    )}

                    {session && profile?.role === 'admin' && (
                        <li>
                            <Link
                                to="/admin/dashboard"
                                className="nav-btn"
                                onClick={() => setMenuOpen(false)}
                            >
                                Admin Dashboard
                            </Link>
                        </li>
                    )}

                    {session && (
                        <li>
                            <button className="nav-btn-ghost" onClick={handleSignOut}>
                                Sign Out
                            </button>
                        </li>
                    )}
                </ul>

            </div>
        </nav>
    );
}
