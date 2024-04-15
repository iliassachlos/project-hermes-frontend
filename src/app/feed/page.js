'use client'
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation"; // Use useRouter instead of next/navigation
import ArticleCard from "@/components/feed/article-card";
import {useAuth} from "@/context/auth-context";
import axios from "axios";
import {Pagination, Skeleton, Spinner} from "@nextui-org/react";

function FeedPage() {
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    const articlesPerPage = 15;
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

    const {userInfo} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (userInfo) {
            fetchAllArticles();
        } else {
            router.push("/");
        }
    }, [userInfo, router]);

    async function fetchAllArticles() {
        try {
            const response = await axios.get("http://localhost:8080/api/articles/all");
            setArticles(response.data);
            setTotalPages(Math.ceil(response.data.length / articlesPerPage));
            setIsLoaded(true); // Set isLoaded to true after fetching articles
        } catch (error) {
            console.error(error);
        }
    }

    function handlePageChange(pageNumber) {
        setCurrentPage(pageNumber);
        window.scrollTo({top: 0, behavior: "smooth"});
    }

    console.log(articles)

    return (
        <div>
            <div
                className="flex flex-col justify-center items-center md:grid md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-3 p-2 md:p-4">
                {currentArticles.map((article, index) => (
                    <div className="flex" key={index}>
                        {/* Render the ArticleCard directly */}
                        <ArticleCard article={article}/>
                    </div>
                ))}
                {/* Show Skeleton when articles are not loaded */}
                {!isLoaded && (
                    <div className="flex">
                        <Skeleton className="rounded-md" width="100%" height="200px"/>
                    </div>
                )}
            </div>
            <div className="flex justify-center items-center mt-2 mb-4">
                {isLoaded && (
                    <Pagination total={totalPages} page={currentPage} onChange={handlePageChange} variant="flat"/>
                )}
            </div>
        </div>
    );
}

export default FeedPage;
