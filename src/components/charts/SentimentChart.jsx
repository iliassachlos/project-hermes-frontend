import React from 'react';
import {Bar} from 'react-chartjs-2';
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function SentimentChart({sentimentScoreDistribution}) {
    const labels = Object.keys(sentimentScoreDistribution);
    const counts = Object.values(sentimentScoreDistribution);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Sentiment Score Distribution',
                data: counts,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    }

    const chartOptions = {
                responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Sentiment Score Distribution',
            },
        },
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-2xl">
                <Bar data={chartData} options={chartOptions} />
            </div>
        </div>
    );
}

export default SentimentChart;
