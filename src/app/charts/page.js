'use client'
import {Chip, Spinner} from "@nextui-org/react";
import CategoryChart from "@/components/charts/category-chart";
import axios from "axios";
import {useEffect, useState} from "react";
import SentimentChart from "@/components/charts/sentiment-chart";

function ChartsPage() {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [sentimentScoreDistribution, setSentimentScoreDistribution] = useState(null);


    useEffect(() => {
        fetchAllArticles();

        fetchSentimentData();

    }, []);

    async function fetchAllArticles() {
        try {
            const response = await axios.get('http://localhost:8083/api/articles/all');
            setArticles(response.data);
        } catch (error) {
            console.log(error);
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }

    async function fetchSentimentData() {
        try {
            const response = await axios.post('http://localhost:8083/api/elastic/chart')
            setSentimentScoreDistribution(response.data.sentimentScoreDistribution)
        } catch (error) {
            setError(error.message)
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
                    <CategoryChart articles={articles}/>
                    <SentimentChart sentimentScoreDistribution={sentimentScoreDistribution} />
                </div>
            )}
        </div>
    );
}

export default ChartsPage;
