'use client'
import {Button, Card, CardFooter, CardHeader, Image} from "@nextui-org/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faLandmark,
    faDollarSign,
    faFutbol,
    faQuestion,
    faMugSaucer,
    faStaffSnake,
    faComputer
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

function ArticleCard({article}) {

    function iconSelector() {
        switch (article.category) {
            case "politics":
                return faLandmark
            case "economy":
                return faDollarSign
            case "sports":
                return faFutbol
            case "lifestyle":
                return faMugSaucer
            case "health":
                return faStaffSnake
            case "technology":
                return faComputer
            default:
                return faQuestion
        }
    }

    return (
        <Card isFooterBlurred className="flex h-[300px] col-span-12 sm:col-span-7">
            <CardHeader className="absolute top-1">
                <div className="bg-black/50 backdrop-blur-md rounded-md px-1">
                    <FontAwesomeIcon className="text-white" icon={iconSelector()}/>
                </div>
            </CardHeader>
            <Image
                removeWrapper
                alt="Relaxing app background"
                className="z-0 w-full h-full object-cover"
                src={article.image}
            />
            <CardFooter
                className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                <div className="flex justify-center items-center">
                    <div className="flex flex-col">
                        <p className="text-xs text-white">{article.source}</p>
                        <p className="text-white text-sm text-left">
                            {article.title}
                        </p>
                    </div>
                    <div className="mx-2">
                        <Link href={`/feed/${article.uuid}`}>
                            <Button radius="md" size="sm">Read Article</Button>
                        </Link>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}

export default ArticleCard;