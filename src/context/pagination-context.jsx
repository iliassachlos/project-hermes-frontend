'use client'
import {createContext, useContext, useState} from "react"

const PaginationContext = createContext(undefined)

export function PaginationProvider({children}) {
    const [articles, setArticles] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(18)

    const lastPostIndex = currentPage * postsPerPage
    const firstPostIndex = lastPostIndex - postsPerPage
    const currentArticles = articles.slice(firstPostIndex, lastPostIndex)

    let pages = Math.ceil(articles.length / postsPerPage)

    const contextValues = {
        currentPage,
        setCurrentPage,
        currentArticles,
        setArticles,
        pages
    }

    return <PaginationContext.Provider value={contextValues}>{children}</PaginationContext.Provider>
}

export function usePagination() {
    const context = useContext(PaginationContext)
    if (!context) {
        throw new Error("usePagination must be used within an PaginationProvider");
    }
    return context
}