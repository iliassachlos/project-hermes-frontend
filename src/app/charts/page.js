'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SentimentChart from "@/components/charts/SentimentChart";


function SentimentPage() {
    const [sentimentScoreDistribution, setSentimentScoreDistribution] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSentimentData = async () => {
            try {
                const response = await axios.post('http://localhost:8083/api/elastic/chart');
                setSentimentScoreDistribution(response.data.sentimentScoreDistribution);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchSentimentData();
    }, []);

    return (
        <div>
            <h1>Sentiment Analysis</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
                    {sentimentScoreDistribution && (
                        <SentimentChart sentimentScoreDistribution={sentimentScoreDistribution} />
                    )}
        </div>
    );
}

export default SentimentPage;
