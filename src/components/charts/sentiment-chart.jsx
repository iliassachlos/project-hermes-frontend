import React from 'react';
import {Bar} from 'react-chartjs-2';
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from 'chart.js';
import {Card, CardBody, CardHeader} from "@nextui-org/react";

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

    const options = {
        maintainAspectRatio: false,
        responsive: true,
    };

    return (
        <Card className="flex flex-col" radius="md">
            <CardHeader>
                <h1 className="text-xl">Sentiment</h1>
            </CardHeader>
            <CardBody>
                <Bar className="w-full" data={chartData} options={options}/>
            </CardBody>
        </Card>
    );
}

export default SentimentChart;