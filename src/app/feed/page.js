'use client'
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import ArticleCard from "@/components/feed/article-card";
import {useAuth} from "@/context/auth-context";
import axios from "axios";
import {Pagination, Skeleton} from "@nextui-org/react";

function FeedPage() {
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false)

    const articlesPerPage = 20;
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

    const {userInfo} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!userInfo) {
            router.push('/');
        } else {
            fetchAllArticles();
        }
    }, [userInfo, router]);

    async function fetchAllArticles() {
        await axios.get('http://localhost:8080/api/articles/all')
            .then((response) => {
                setArticles(response.data)
                setTotalPages(Math.ceil(response.data.length / articlesPerPage))
            })
            .catch((error) => {
                console.error(error)
            })
            .finally(() => {
                setIsLoaded(true)
            })
    }

    function handlePageChange(pageNumber) {
        setCurrentPage(pageNumber)
        window.scrollTo({top: 0, behavior: "smooth"})
    }

    return (
        <div>
            <div
                className="flex flex-col justify-center items-center md:grid md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-3 p-2 md:p-4">
                {currentArticles.map((article, index) => (
                    <div className="flex" key={index}>
                        <Skeleton className="rounded-md" isLoaded={isLoaded}>
                            {isLoaded && <ArticleCard article={article}/>}
                        </Skeleton>
                    </div>
                ))}
            </div>
            <div className="flex justify-center items-center mt-2 mb-4">
                {isLoaded &&
                    <Pagination total={totalPages} page={currentPage} onChange={handlePageChange} variant="flat"/>}
            </div>
        </div>
    );
}

export default FeedPage;
