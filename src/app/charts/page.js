'use client'
import {Chip, Spinner} from "@nextui-org/react";
import CategoryChart from "@/components/charts/category-chart";
import axios from "axios";
import {useEffect, useState} from "react";
import SentimentChart from "@/components/charts/sentiment-chart";
import SourceChart from "@/components/charts/source-chart";

function ChartsPage() {
    const [sentimentScoreDistribution, setSentimentScoreDistribution] = useState(null);
    const [categoryDistribution, setCategoryDistribution] = useState(null);
    const [sourceDistribution, setSourceDistribution] = useState(null);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        fetchChartsData();
    }, []);

    async function fetchChartsData() {
        try {
            const response = await axios.post('http://localhost:8083/api/elastic/chart')
            setSentimentScoreDistribution(response.data.sentimentScoreDistribution)
            setCategoryDistribution(response.data.categoryDistribution)
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
                    <CategoryChart categoryDistribution={categoryDistribution}/>
                    <SentimentChart sentimentScoreDistribution={sentimentScoreDistribution}/>
                    <SourceChart sourceDistribution={sourceDistribution}/>
                </div>
            )}
        </div>
    );
}

export default ChartsPage;
