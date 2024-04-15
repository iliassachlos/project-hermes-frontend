'use client'
import {useAuth} from "@/context/auth-context";
import {useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";

function BookmarkedArticlesPage() {
    const [bookmarkedArticles, setBookmarkedArticles] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const {userInfo} = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (userInfo) {
            fetchBookmarkedArticles()
        } else {
            router.push('/')
        }
    }, [fetchBookmarkedArticles, router, userInfo])

    async function fetchBookmarkedArticles() {
        setIsLoading(true)
        try {
            const response = await axios.get(`http://localhost:8081/api/users/bookmarks/${userInfo?.id}`)
            setBookmarkedArticles(response.data)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    console.log(userInfo.id)
    console.log(bookmarkedArticles)

    return (
        <div>
            <div>
                bookmarked page
            </div>
        </div>
    )
}

export default BookmarkedArticlesPage