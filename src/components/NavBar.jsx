import React from 'react';

export function NavBar({ title }) {
    return (
        <div className="nav-bar">
            <div className="nav-left">
                <span className="nav-logo">🌿</span>
                <span className="nav-title">
                    {title}
                    <span className="author-name"> by Ömür Buğra Gündüz</span>
                </span>
            </div>
        </div>
    );
}
