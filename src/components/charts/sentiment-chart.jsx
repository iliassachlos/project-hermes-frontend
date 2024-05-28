import {Bar} from 'react-chartjs-2';
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from 'chart.js';
import {Card, CardBody, CardHeader} from "@nextui-org/react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function SentimentChart({sentimentScoreDistribution}) {
    const labels = Object.keys(sentimentScoreDistribution);
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