import React from 'react';
import '../index.css';

export function DataList({ items }) {
    return (
        <table className="data-table">
            <thead>
            <tr>
                <th>Metric</th>
                <th style={{ textAlign: 'right' }}>Value</th>
            </tr>
            </thead>
            <tbody>
            {items.map(({ label, value }) => (
                <tr key={label}>
                    <td>{label}</td>
                    <td style={{ textAlign: 'right' }}>{value}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}
