import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css'  // instead of './Header.css'

function Header() {
    return (
        <header className="header">
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/upload">Upload Package</Link></li>
                    <li><Link to="/settings">Settings</Link></li>
                </ul>
            </nav>
        </header>
    );
}



export default Header;
