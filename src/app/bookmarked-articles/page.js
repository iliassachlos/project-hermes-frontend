'use client'
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import ArticleCard from "@/components/shared/article-card";
import {useAuth} from "@/context/auth-context";
import axios from "axios";
import {Pagination, Spinner} from "@nextui-org/react";

function BookmarkedArticlesPage() {
    const [bookmarkedArticles, setBookmarkedArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const bookmarkedArticlesPerPage = 15
    const indexOfLastBookmarkedArticle = currentPage * bookmarkedArticlesPerPage
    const indexOfFirstBookmarkedArticle = indexOfLastBookmarkedArticle - bookmarkedArticlesPerPage
    const currentBookmarkedArticles = bookmarkedArticles.slice(indexOfFirstBookmarkedArticle, indexOfLastBookmarkedArticle)

    const {userInfo} = useAuth()
    const router = useRouter()

    useEffect(() => {
        fetchAllArticles()
    }, [userInfo, router])

    async function fetchAllArticles() {
        try {
            const response = await axios.get(`http://localhost:8083/api/users/bookmarks/${userInfo?.id}`)
            setBookmarkedArticles(response.data)
            setTotalPages(Math.ceil(response.data.length / bookmarkedArticlesPerPage))
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

    return (
        <div className="p-2">
            <h1 className="text-4xl font-semibold py-3 md:py-2 px-4">Bookmarked Articles</h1>
            {isLoading && <div className="flex justify-center items-center h-screen"><Spinner/></div>}
            {!isLoading &&
                <>
                    <div
                        className="flex flex-col justify-center items-center md:grid md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 py-3 gap-3 md:p-4">
                        {currentBookmarkedArticles.map((bookmarkedArticle, index) => (
                            <div className="flex" key={index}>
                                <ArticleCard article={bookmarkedArticle}/>
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

export default BookmarkedArticlesPage;
