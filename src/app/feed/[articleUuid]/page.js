'use client'
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import axios from "axios";
import {Button, Card, Skeleton, Tooltip} from "@nextui-org/react";
import {Image} from "@nextui-org/react";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookmark as faBookmarked} from "@fortawesome/free-solid-svg-icons";
import {faBookmark as faNotBookmarked} from "@fortawesome/free-regular-svg-icons"
import {useAuth} from "@/context/auth-context";
import SentimentCard from "@/components/shared/sentiment-card";
import DateCard from "@/components/shared/date-card";

function ArticleSinglePage() {
    const [article, setArticle] = useState()
    const [isArticleBookmarked, setIsArticleBookmarked] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const {userInfo} = useAuth()
    const {articleUuid} = useParams()

    useEffect(() => {
        fetchArticleByUuid(articleUuid)
        checkIfBookmarked()
        return () => {
            updateArticleViewCount(articleUuid)
        }
    }, [articleUuid, userInfo]);

    async function fetchArticleByUuid(articleUuid) {
        setIsLoading(true)
        try {
            const response = await axios.get(`http://localhost:8083/api/articles/${articleUuid}`)
            setArticle(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    async function updateArticleViewCount(articleUuid) {
        try {
            await axios.put(`http://localhost:8083/api/articles/${articleUuid}/views`)
        } catch (error) {
            console.error(error)
        }
    }

    async function checkIfBookmarked() {
        try {
            if (userInfo) {
                const userId = userInfo.id
                const response = await axios.get(`http://localhost:8083/api/users/bookmark/${userId}`)
                const bookmarkedArticles = response.data
                const isBookmarked = bookmarkedArticles.some((article) => article.uuid === articleUuid)
                setIsArticleBookmarked(isBookmarked)
            }
        } catch (error) {
            console.error(error)
        }
    }

    async function addBookmark() {
        try {
            if (userInfo) {
                const userId = userInfo.id
                await axios.post('http://localhost:8083/api/users/bookmark/add', {
                    articleId: articleUuid,
                    userId: userId
                })
                console.log("Added Bookmark")
                setIsArticleBookmarked(true)
            }
        } catch (error) {
            console.error(error)
        }
    }

    async function removeBookmark() {
        try {
            const userId = userInfo.id;
            await axios.put(`http://localhost:8083/api/users/bookmark/delete`, {
                articleId: articleUuid,
                userId: userId
            });
            console.log("Bookmark Removed");
            setIsArticleBookmarked(false)
        } catch (error) {
            console.error(error);
        }
    }

    // <DateCard articleTime={article?.time}/>
    return (
        <div className='xl:mx-40 p-4'>
            <Card>
                <div className="p-4">
                    <Skeleton className="rounded-md" isLoaded={article}>
                        <div className="flex justify-between items-center my-4">
                            <div className="flex">
                                <h2 className="text-gray-500 text-sm capitalize">{article?.source}</h2>
                                <span className="text-purple-500 font-bold mx-1">&gt;</span>
                                <h2 className="font-semibold text-sm capitalize">{article?.category}</h2>
                            </div>
                            <div className="flex">
                                <DateCard articleTime={article?.time}/>
                            </div>
                        </div>
                    </Skeleton>
                    <Skeleton className="rounded-md my-4" isLoaded={article}>
                        <div className="flex justify-center items-center">
                            <div>
                                <h1 className="text-3xl font-semibold text-justify">{article?.title}</h1>
                            </div>
                        </div>
                    </Skeleton>
                    <Skeleton className="rounded-md my-4" isLoaded={article}>
                        <div className="flex justify-center items-center mt-10">
                            {article?.image &&
                                <Image src={article?.image} alt="broken-article-img" width={800} height={700}/>
                            }
                        </div>
                    </Skeleton>
                    <Skeleton className="rounded-md my-4" isLoaded={article}>
                        <div className="flex flex-row justify-between items-center mt-2 border-b-2 p-2">
                            <div className="flex justify-start text-sm my-1">
                                <SentimentCard sentimentScore={article?.sentimentScore}/>
                            </div>
                            <div className="flex justify-center items-center">
                                <div className="cursor-pointer hover:scale-105 ease-in duration-200 mx-4">
                                    <Tooltip content="Bookmark Article" placement="top">
                                        <FontAwesomeIcon
                                            className="mr-2"
                                            icon={isArticleBookmarked ? faBookmarked : faNotBookmarked}
                                            size="lg"
                                            onClick={isArticleBookmarked ? removeBookmark : addBookmark}
                                        />
                                    </Tooltip>
                                </div>
                                <div>
                                    <Link href={article?.url ? article.url : '#'} target="_blank">
                                        <Button variant="ghost" color="primary">
                                            Read From Original Source
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </Skeleton>
                    <Skeleton className="rounded-md my-" isLoaded={article}>
                        <div className="my-5">
                            <p className="text-justify">{article?.content}</p>
                        </div>
                    </Skeleton>
                </div>
            </Card>
        </div>
    );
}

export default ArticleSinglePage;