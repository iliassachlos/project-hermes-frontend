import React, {useEffect, useState} from 'react';
import {Doughnut} from 'react-chartjs-2';
import {Card, CardBody, CardHeader} from "@nextui-org/react";
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function CategoryChart({articles}) {
    const [categoryData, setCategoryData] = useState({});

    const validCategories = ["politics", "economy", "sports", "technology", "lifestyle"];

    useEffect(() => {
        getAllCategories();
    }, []);

    function getAllCategories() {
        const categoryCounts = validCategories.reduce((acc, category) => {
            acc[category] = 0;
            return acc;
        }, {});

        articles.forEach((article) => {
            if (validCategories.includes(article.category)) {
                categoryCounts[article.category]++;
            }
        });

        setCategoryData(categoryCounts);
    }

    const chartData = {
        labels: Object.keys(categoryData),
        datasets: [
            {
                data: Object.values(categoryData),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
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
