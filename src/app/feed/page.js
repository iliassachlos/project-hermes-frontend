'use client'
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import ArticleCard from "@/app/components/feed/article-card";
import {articleData} from "@/app/data"

function FeedPage() {
    const user = true

    const router = useRouter()

    useEffect(() => {
        if(!user){
            router.push('/')
        }
    }, [user,router]);

    return (
        <div className="flex flex-col justify-center items-center md:grid md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-3 p-2 md:p-4">
            {articleData.map((article,index) => (
                <div className="flex" key={index}>
                    <ArticleCard article={article} />
                </div>
            ))}
        </div>
    )
}

export default FeedPage