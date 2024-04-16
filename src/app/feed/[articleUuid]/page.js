'use client'
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import axios from "axios";
import {Button, Card, Skeleton, Tooltip, user,} from "@nextui-org/react";
import {Image} from "@nextui-org/react";
import Link from "next/link";
import {formatDate} from "@/utilities/format-date";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar, faBookmark as faBookmarked} from "@fortawesome/free-solid-svg-icons";
import {faBookmark as faNotBookmarked} from "@fortawesome/free-regular-svg-icons"
import {useAuth} from "@/context/auth-context";

function ArticleSinglePage() {
    const [article, setArticle] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [isArticleBookmarked, setIsArticleBookmarked] = useState(false)

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
        } finally {
            setIsLoading(false)
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
                const response = await axios.get(`http://localhost:8083/api/users/bookmarks/${userId}`)
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
                await axios.post('http://localhost:8083/api/users/bookmarks/add', {
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
            await axios.put(`http://localhost:8083/api/users/bookmarks/delete`, {
                articleId: articleUuid,
                userId: userId
            });
            console.log("Bookmark Removed");
            setIsArticleBookmarked(false)
        } catch (error) {
            console.error(error);
        }
    }

    console.log(userInfo?.id)

    return (
        <div className='xl:mx-40 p-4'>
            <Card>
                <div className="p-4">
                    <Skeleton className="rounded-md my-4" isLoaded={article}>
                        <div className="flex mb-4">
                            <h2 className="text-gray-500 text-sm capitalize">{article?.source}</h2>
                            <span className="text-purple-500 font-bold mx-1">&gt;</span>
                            <h2 className="font-semibold text-sm capitalize"> {article?.category}</h2>
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
                        <div className="flex flex-row justify-between items-center mt-4 border-b-2 p-2">
                            <div className="flex justify-start my-1">
                                <FontAwesomeIcon className="text-white" icon={faCalendar}/>
                                <h2 className="text-sm mx-2">{formatDate(article?.time)}</h2>
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