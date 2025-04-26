import React, { useState } from 'react';
import './index.css';
import models from './data/models.json';

import { ModelViewer } from './components/ModelViewer';
import { DataList    } from './components/DataList';
import { BarChart    } from './components/BarChart';
import { Calculator  } from './components/Calculator';

export default function App() {
    const [selectedId, setSelectedId] = useState(models[0].id);
    const selected  = models.find(m => m.id === selectedId);
    const reference = models.find(m => m.id === 'reference');

    // build labels + data for chart
    const chartModels = selectedId === 'reference'
        ? [reference]
        : [reference, selected];

    const chartData = {
        labels: chartModels.map(m => m.name),
        datasets: [
            {
                label: 'Cooling',
                data: chartModels.map(m => m.chartValues.cooling),
                backgroundColor: '#3b82f6'
            },
            {
                label: 'Heating',
                data: chartModels.map(m => m.chartValues.heating),
                backgroundColor: '#ef4444'
            },
            {
                label: 'Lighting',
                data: chartModels.map(m => m.chartValues.lighting),
                backgroundColor: '#f59e0b'
            },
            {
                label: 'PV',
                data: chartModels.map(m => m.chartValues.pv),
                backgroundColor: '#10b981'
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            title: { display: true, text: 'Energy' },
            legend: { position: 'top' }
        },
        scales: {
            x: { stacked: true,  },
            y: {
                stacked: true,
                title: { display: true, text: 'Total Energy (kWh/m²)' }
            }
        }
    };

    return (
        <>
            <header className="header">
                <label>
                    Choose model:
                    <select
                        value={selectedId}
                        onChange={e => setSelectedId(e.target.value)}
                    >
                        {models.map(m => (
                            <option key={m.id} value={m.id}>
                                {m.name}
                            </option>
                        ))}
                    </select>
                </label>
            </header>

            <div className="main-grid">
                {/* Top-Left: Table */}
                <div className="grid-item">
                    <DataList items={selected.dataList} />
                </div>

                {/* Top-Right: 3D */}
                <div className="grid-item">
                    <div className="canvas-wrapper">
                        <ModelViewer url={selected.url} />
                    </div>
                </div>

                {/* Bottom-Left: Stacked Bar Chart */}
                <div className="grid-item">
                    <BarChart chartData={chartData} chartOptions={chartOptions} />
                </div>

                {/* Bottom-Right: Calculator */}
                <div className="grid-item">
                    <Calculator values={selected.chartValues} />
                </div>
            </div>
        </>
    );
}
