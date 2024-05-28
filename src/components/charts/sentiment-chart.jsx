import React from 'react';
import {Bar} from 'react-chartjs-2';
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from 'chart.js';
import {Card, CardBody, CardHeader} from "@nextui-org/react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function SentimentChart({sentimentScoreDistribution, aggregationType}) {
    const counts = Object.values(sentimentScoreDistribution);

    const chartData = {
        labels: ['Very Negative','Negative','Neutral','Positive','Very Positive'],
        datasets: [
            {
                label: 'Sentiment Score Dataset',
                data: counts,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(201, 203, 207, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(134,50,68,0.2)',
                    'rgba(138,86,34,0.2)',
                    'rgba(103,104,107,0.2)',
                    'rgba(29,84,122,0.2)',
                    'rgba(36,93,93,0.2)'
                ],
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
                <h1 className="text-xl">{aggregationType}</h1>
            </CardHeader>
            <CardBody>
                <Bar className="w-full" data={chartData} options={options}/>
            </CardBody>
        </Card>
    );
}

export default SentimentChart;