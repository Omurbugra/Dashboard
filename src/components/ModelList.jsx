import React from 'react';
import '../index.css';

export function ModelList({ models, selectedId, onSelect }) {
    // 1. Her modelin demand - pv farkını hesapla
    const gaps = models.map(model => {
        const values = model.chartValues;
        const demand = values.cooling + values.heating + values.lighting;
        const pv = Math.abs(values.pv || 0);
        return Math.max(demand - pv, 0);
    });

    const maxGap = Math.max(...gaps, 1); // En büyük fark (referans için)

    return (
        <div className="model-list">
            <ul className="model-list-items">
                {models.map((model, i) => {
                    const selected = model.id === selectedId;
                    const values = model.chartValues;

                    const demand = values.cooling + values.heating + values.lighting;
                    const pv = Math.abs(values.pv || 0);
                    const gap = Math.max(demand - pv, 0);

                    const barWidth = gap === 0
                        ? 100
                        : ((maxGap - gap) / maxGap) * 100;

                    return (
                        <li
                            key={model.id}
                            className={`model-list-item${selected ? ' selected' : ''}`}
                            onClick={() => onSelect(model.id)}
                        >
                            <span className="model-icon">🏠</span>
                            <span className="model-name">{model.name}</span>
                            <div className="model-bar">
                                <div
                                    className="model-bar-inner"
                                    style={{ width: `${barWidth}%` }}
                                />
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
