import React, { useState } from 'react';
import '../index.css';

export function Calculator({ values }) {
    const consumption = values.cooling + values.heating + values.lighting;
    const generation = Math.abs(Math.min(values.pv, 0));
    const [price, setPrice] = useState(0);

    const cost    = consumption * price;
    const savings = generation  * price;
    const net     = cost - savings;

    return (
        <div className="calculator">
            <h3>Cost Calculator</h3>

            <div className="calc-field">
                <label>Price (€ / kWh):</label>
                <input
                    type="number"
                    className="calc-input"
                    value={price}
                    step="0.01"
                    onChange={e => setPrice(parseFloat(e.target.value) || 0)}
                />
            </div>

            <div className="calc-results">
                <div className="result">
                    <span>Consumption Cost</span>
                    <span>€{cost.toFixed(2)}</span>
                </div>
                <div className="result">
                    <span>Generation Savings</span>
                    <span>€{savings.toFixed(2)}</span>
                </div>
                <div className="result">
                    <strong>Net Cost</strong>
                    <strong>€{net.toFixed(2)}</strong>
                </div>
            </div>
        </div>
    );
}
