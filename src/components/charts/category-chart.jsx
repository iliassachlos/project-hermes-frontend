import {Doughnut} from 'react-chartjs-2';
import {Card, CardBody, CardHeader} from "@nextui-org/react";
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function CategoryChart({categoryDistribution}) {
    const labels = Object.keys(categoryDistribution);
    const counts = Object.values(categoryDistribution);

    const chartData = {
        labels: labels,
        datasets: [
            {
                data: counts,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF','#50C878'],
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        responsive: true,
    };

    return (
        <Card className="flex flex-col" radius="md">
            <CardHeader>
                <h1 className="text-xl">Categories</h1>
            </CardHeader>
            <CardBody>
                <Doughnut data={chartData} className="w-[700px]" options={options}/>
            </CardBody>
        </Card>
    );
}

export default CategoryChart;
