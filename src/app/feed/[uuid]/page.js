'use client'
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import axios from "axios";
import {Button, Card, Spinner} from "@nextui-org/react";
import {Image} from "@nextui-org/react";
import Link from "next/link";
import {formatDate} from "@/formatDate";
import {faCalendar} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function ArticleSinglePage() {
    const {uuid} = useParams()
    const [article, setArticle] = useState()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        fetchArticleByUuid(uuid)
        return () => {
            updateArticleViewCount(uuid)
        }
    }, [uuid]);

    async function fetchArticleByUuid(uuid) {
        setIsLoading(true)
        await axios.get(`http://localhost:8080/api/articles/${uuid}`)
            .then((response) => {
                setArticle(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    async function updateArticleViewCount(uuid) {
        await axios.put(`http://localhost:8080/api/articles/${uuid}/views`)
            .catch((error) => console.error(error))
    }

    return (
        <div className='xl:mx-40 p-4'>
            {isLoading && <Spinner/>}
            {!isLoading && article &&
                <Card>
                    <div className="p-4">
                        <div className="flex justify-start mb-4">
                            <h2 className="text-gray-500 text-sm capitalize">{article?.source}</h2>
                            <span className="text-purple-500 font-bold mx-1">&gt;</span>
                            <h2 className="font-semibold text-sm capitalize"> {article?.category}</h2>
                        </div>
                        <div className="flex justify-center items-center">
                            <div>
                                <h1 className="text-3xl font-semibold text-justify">{article?.title}</h1>
                            </div>
                        </div>
                        <div className="flex justify-center items-center mt-10">
                            {article?.image &&
                                <Image src={article?.image} alt="broken-article-img" width={800} height={700}/>
                            }
                        </div>
                        <div className="flex flex-row justify-between items-center mt-4 border-b-2 p-2">
                            <div className="flex justify-start my-1">
                                <FontAwesomeIcon className="text-white" icon={faCalendar}/>
                                <h2 className="text-sm mx-2">{formatDate(article?.time)}</h2>
                            </div>
                            <Link href={article?.url} target="_blank">
                                <Button variant="bordered" color="primary">
                                    Read From Original Source
                                </Button>
                            </Link>
                        </div>
                        <div className="my-5">
                            <p className="text-justify">{article?.content}</p>
                        </div>
                    </div>
                </Card>
            }

        </div>
    );
}

export default ArticleSinglePage;