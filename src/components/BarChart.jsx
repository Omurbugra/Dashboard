import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Custom plugin to draw consumption/generation arrows with offset spine labels
const ArrowPlugin = {
    id: 'arrowPlugin',
    afterDraw: chart => {
        const { ctx, chartArea: { top, bottom, right }, scales: { y } } = chart;
        const zeroY = y.getPixelForValue(0);
        const hasNegative = chart.data.datasets.some(ds => ds.data.some(v => v < 0));
        const xPos = right + 20;
        const labelOffset = 12;

        // Draw consumption arrow
        ctx.save();
        ctx.strokeStyle = '#000';
        ctx.fillStyle = '#000';
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(xPos, zeroY);
        ctx.lineTo(xPos, top);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(xPos, top);
        ctx.lineTo(xPos - 5, top + 10);
        ctx.lineTo(xPos + 5, top + 10);
        ctx.closePath();
        ctx.fill();

        const midYcons = (zeroY + top) / 2;
        ctx.save();
        ctx.translate(xPos + labelOffset, midYcons);
        ctx.rotate(Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Consumption', 0, 0);
        ctx.restore();

        if (hasNegative) {
            ctx.save();
            ctx.strokeStyle = 'gray';
            ctx.fillStyle = 'gray';
            ctx.lineWidth = 1;

            ctx.beginPath();
            ctx.moveTo(xPos, zeroY);
            ctx.lineTo(xPos, bottom);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(xPos, bottom);
            ctx.lineTo(xPos - 5, bottom - 10);
            ctx.lineTo(xPos + 5, bottom - 10);
            ctx.closePath();
            ctx.fill();

            const midYgen = (zeroY + bottom) / 2;
            ctx.save();
            ctx.translate(xPos + labelOffset, midYgen);
            ctx.rotate(Math.PI / 2);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('Generation', 0, 0);
            ctx.restore();
        }

        ctx.restore();
    }
};

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArrowPlugin
);

export function BarChart({ chartData, chartOptions }) {
    const options = {
        barPercentage: 0.4,
        ...chartOptions,
        maintainAspectRatio: false,
        devicePixelRatio: window.devicePixelRatio,
        layout: {
            padding: { right: 50 }
        },
        plugins: {
            ...chartOptions.plugins,
            arrowPlugin: {}
        },
        scales: {
            ...chartOptions.scales,
            x: {
                ...(chartOptions.scales?.x || {}),
                ticks: {
                    callback: function (value) {
                        const label = this.getLabelForValue(value);
                        if (label.length > 25) {
                            return [label.slice(0, 25), label.slice(25)];
                        }
                        return label;
                    },
                    maxRotation: 0,
                    minRotation: 0
                }
            }
        }
    };

    return (
        <div className="chart-wrapper">
            <Bar data={chartData} options={options} />
        </div>
    );
}
