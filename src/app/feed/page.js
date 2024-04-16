'use client'
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation"; // Use useRouter instead of next/navigation
import ArticleCard from "@/components/shared/article-card";
import {useAuth} from "@/context/auth-context";
import axios from "axios";
import {Pagination, Skeleton, Spinner} from "@nextui-org/react";

function FeedPage() {
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const articlesPerPage = 15
    const indexOfLastArticle = currentPage * articlesPerPage
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle)

    const {userInfo} = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (userInfo) {
            fetchAllArticles()
        } else {
            router.push("/")
        }
    }, [userInfo, router])

    async function fetchAllArticles() {
        try {
            const response = await axios.get("http://localhost:8083/api/articles/all")
            setArticles(response.data)
            setTotalPages(Math.ceil(response.data.length / articlesPerPage))
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    function handlePageChange(pageNumber) {
        setCurrentPage(pageNumber)
        window.scrollTo({top: 0, behavior: "smooth"})
    }

    console.log(currentArticles)

    return (
        <div>
            {isLoading && <div className="flex justify-center items-center h-screen"><Spinner/></div>}
            {!isLoading &&
                <>
                    <div
                        className="flex flex-col justify-center items-center md:grid md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-3 p-2 md:p-4">
                        {currentArticles.map((article, index) => (
                            <div className="flex" key={index}>
                                <ArticleCard article={article}/>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center items-center mt-2 mb-4">
                        <Pagination total={totalPages} page={currentPage} onChange={handlePageChange} variant="flat"/>
                    </div>
                </>
            }
        </div>
    );
}

export default FeedPage;
