import React from 'react';
import {Bar} from 'react-chartjs-2';
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from 'chart.js';
import {Card, CardBody, CardHeader} from "@nextui-org/react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChart({sentimentScoreDistribution, aggregationType}) {
    const labels = Object.keys(sentimentScoreDistribution);
    const counts = Object.values(sentimentScoreDistribution);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: `${aggregationType} Distribution`,
                data: counts,
                backgroundColor: '#9966FF',
                borderColor: '#2a007f',
                borderWidth: 2,
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

export default BarChart;