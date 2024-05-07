'use client'
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import ArticleCard from "@/components/shared/article-card";
import {useAuth} from "@/context/auth-context";
import axios from "axios";
import {Card, CardBody, Pagination, Spinner} from "@nextui-org/react";
import SearchBar from "@/components/shared/search-bar";
import {usePagination} from "@/context/pagination-context";

function FeedPage() {
    const [isLoading, setIsLoading] = useState(true);
    const {currentPage, setCurrentPage, currentArticles, setArticles, pages} = usePagination();
    const {userInfo} = useAuth();
    const router = useRouter();

    useEffect(() => {
        fetchAllArticles();
    }, []); // Empty dependency array to run only once on component mount

    async function fetchAllArticles() {
        try {
            const response = await axios.get("http://localhost:8083/api/articles/all");
            setArticles(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    function handlePageChange(pageNumber) {
        setCurrentPage(pageNumber);
        window.scrollTo({top: 0, behavior: "smooth"});
    }

    function onFilteredArticles(filteredArticles) {
        setArticles(filteredArticles.articles);
        console.log(filteredArticles.articles);
    }

    return (
        <div className="p-2">
            <div className="flex justify-center items-center">
                <SearchBar onFilteredArticles={onFilteredArticles} onFetchAllArticles={fetchAllArticles}/>
            </div>
            <h1 className="text-4xl font-semibold py-3 md:py-2 px-4">News Today</h1>
            {isLoading && <div className="flex justify-center items-center h-screen"><Spinner/></div>}
            {!isLoading && currentArticles.length > 0 && (
                <>
                    <div
                        className="flex flex-col justify-center items-center md:grid md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 py-3 gap-3 md:p-4">
                        {currentArticles.map((article, index) => (
                            <div className="flex" key={index}>
                                <ArticleCard article={article}/>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center items-center mt-2 mb-4">
                        <Pagination total={pages} page={currentPage} onChange={handlePageChange} variant="flat"/>
                    </div>
                </>
            )}
            {!isLoading && currentArticles.length === 0 && (
                <div className="flex justify-center items-center mt-[20%]">
                    <Card>
                        <CardBody>
                            <h1>No articles were found! Please try again later</h1>
                        </CardBody>
                    </Card>
                </div>
            )}
        </div>
    );
}

export default FeedPage;
