'use client'
import {Chip, Spinner} from "@nextui-org/react";
import PieChart from "@/components/charts/pie-chart";
import axios from "axios";
import {useEffect, useState} from "react";
import BarChart from "@/components/charts/bar-chart";

function ChartsPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [sentimentScoreDistribution, setSentimentScoreDistribution] = useState(null);
    const [categoryDistribution, setCategoryDistribution] = useState(null);
    const [sourceDistribution, setSourceDistribution]= useState(null);


    useEffect(() => {
        fetchSentimentData();
    }, []);

    async function fetchSentimentData() {
        try {
            const response = await axios.post('http://localhost:8083/api/elastic/chart')
            setCategoryDistribution(response.data.categoryDistribution)
            setSentimentScoreDistribution(response.data.sentimentScoreDistribution)
            setSourceDistribution(response.data.sourceDistribution)
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="p-4">
            <h1 className="text-4xl font-semibold pb-8">Charts</h1>
            {isLoading && (
                <div className="flex justify-center items-center h-screen">
                    <Spinner/>
                </div>
            )}
            {!isLoading && error &&
                <div className="flex justify-center items-center h-screen">
                    <Chip variant="flat">
                        <h1>An error occurred. Please try to reload the page</h1>
                    </Chip>
                </div>
            }
            {!isLoading && !error && (
                <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2 gap-y-8">
                    <PieChart categoryDistribution={categoryDistribution} aggregationType="Categories"/>
                    <BarChart sentimentScoreDistribution={sentimentScoreDistribution} aggregationType="Sentiment"/>
                    <PieChart categoryDistribution={sourceDistribution} aggregationType="Sources" />
                </div>
            )}
        </div>
    );
}

export default ChartsPage;
