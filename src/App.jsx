import React, { useState } from 'react';
import './index.css';
import models from './data/models.json';

import { NavBar } from './components/NavBar';
import { ModelList } from './components/ModelList';
import { ModelViewer } from './components/ModelViewer';
import { DataList } from './components/DataList';
import { BarChart } from './components/BarChart';
import { Calculator } from './components/Calculator';
import { TitleWithTooltip } from './components/TitleWithTooltip';

export default function App() {
    const dashboardTitle = "Residential Sustainability Insights Dashboard";
    const [selectedId, setSelectedId] = useState(models[0].id);
    const selected = models.find(m => m.id === selectedId);
    const reference = models.find(m => m.id === 'reference');

    const chartModels = selectedId === 'reference'
        ? [reference]
        : [reference, selected];

    const chartData = {
        labels: chartModels.map(m => m.name),
        datasets: [
            { label: 'Cooling', data: chartModels.map(m => m.chartValues.cooling), backgroundColor: '#3b82f6' },
            { label: 'Heating', data: chartModels.map(m => m.chartValues.heating), backgroundColor: '#ef4444' },
            { label: 'Lighting', data: chartModels.map(m => m.chartValues.lighting), backgroundColor: '#f59e0b' },
            { label: 'PV', data: chartModels.map(m => m.chartValues.pv), backgroundColor: '#10b981' }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            title: { display: true, text: 'Energy' },
            legend: { position: 'top' }
        },
        scales: {
            x: { stacked: true },
            y: {
                stacked: true,
                title: { display: true, text: 'Total Energy (kWh/m²)' }
            }
        }
    };

    return (
        <>
            <NavBar title={dashboardTitle} />

            <div className="main-layout">
                <div className="top-row">
                    <div className="model-list-panel">
                        <div className="panel model-list">
                            <div className="panel-title-bar">
                                <TitleWithTooltip
                                    title="Available Models"
                                    tooltip="Select one of the predefined scenarios to compare their sustainability metrics."
                                />
                            </div>
                            <ModelList models={models} selectedId={selectedId} onSelect={setSelectedId} />
                        </div>
                    </div>
                    <div className="model-viewer-panel panel">
                        <div className="panel-title-bar">
                            <TitleWithTooltip
                                title="3D Model Viewer"
                                tooltip="Interact with a 3D visualization of the selected model."
                            />
                        </div>
                        <div className="canvas-wrapper">
                            <ModelViewer url={selected.url} />
                        </div>
                    </div>
                </div>

                <div className="bottom-row">
                    <div className="panel panel-wide">
                        <div className="panel-title-bar">
                            <TitleWithTooltip
                                title="Energy Breakdown"
                                tooltip="Shows the relative energy consumption and production values (kWh/m²)."
                            />
                        </div>
                        <BarChart chartData={chartData} chartOptions={chartOptions} />
                    </div>
                    <div className="panel">
                        <div className="panel-title-bar">
                            <TitleWithTooltip
                                title="Data Summary"
                                tooltip="Summarized numerical indicators for the selected building model."
                            />
                        </div>
                        <DataList items={selected.dataList} />
                    </div>
                    <div className="panel">
                        <div className="panel-title-bar">
                            <TitleWithTooltip
                                title="Cost Calculator"
                                tooltip="Estimate energy-related costs based on your input electricity price."
                            />
                        </div>
                        <Calculator values={selected.chartValues} />
                    </div>
                </div>
            </div>
        </>
    );
}
