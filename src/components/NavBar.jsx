import React from 'react';
import '../index.css';

export function NavBar({ title, models, selectedId, onModelChange }) {
    return (
        <header className="nav-bar">
            <div className="nav-left">
                <span className="nav-logo">🌿</span>
                <span className="nav-title">{title}</span>
            </div>

            <div className="nav-right">
                <label className="nav-select-label">
                    Choose model:
                    <select
                        value={selectedId}
                        onChange={e => onModelChange(e.target.value)}
                    >
                        {models.map(m => (
                            <option key={m.id} value={m.id}>
                                {m.name}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
        </header>
    );
}