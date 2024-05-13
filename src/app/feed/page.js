'use client'
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import ArticleCard from "@/components/feed/article-card";
import {useAuth} from "@/context/auth-context";
import axios from "axios";
import {Card, CardBody, Pagination, Spinner} from "@nextui-org/react";
import SearchBar from "@/components/feed/search-bar";
import {usePagination} from "@/context/pagination-context";
import FacetList from "@/components/feed/facet-list";

function FeedPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [showFacets, setShowFacets] = useState(false);
    const [facets, setFacets] = useState([]);
    const [originalQuery, setOriginalQuery] = useState('');
    const {userInfo} = useAuth();
    const {currentPage, setCurrentPage, currentArticles, setArticles, pages} = usePagination();
    const router = useRouter();

    useEffect(() => {
        fetchAllArticles();
    }, []); // Empty dependency array to run only once on component mount

    async function fetchAllArticles() {
        try {
            const response = await axios.get("http://localhost:8083/api/articles/all");
            setArticles(response.data);
            setShowFacets(false);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    function handlePageChange(pageNumber) {
        setCurrentPage(pageNumber);
        window.scrollTo({top: 0, behavior: "smooth"});
    }

    function onFilteredArticles(filteredArticles) {
        setArticles(filteredArticles.articles);
        console.log(filteredArticles.articles);
        const sourceFacetsArray = Object.entries(filteredArticles.sourceFacets);
        const categoryFacetsArray = Object.entries(filteredArticles.categoryFacets);
        setFacets({sourceFacets: sourceFacetsArray, categoryFacets: categoryFacetsArray});
        setShowFacets(true)
    }

    async function handleFacetClick(facet, type) {
        let facetObject = {};
        if (type === 'source') {
            facetObject = { source: facet.toLowerCase() };
        } else if (type === 'category') {
            facetObject = { category: facet.toLowerCase() };
        }

        // Check if the facet is already in the must array
        const index = originalQuery.must.findIndex(obj => JSON.stringify(obj) === JSON.stringify(facetObject));

        if (index !== -1) {
            // If the facet is already in the array, remove it
            originalQuery.must.splice(index, 1);
        } else {
            // If the facet is not in the array, add it
            originalQuery.must.push(facetObject);
        }

        try {
            console.log("must array", originalQuery.must)
            const response = await axios.post('http://localhost:8083/api/elastic/search', originalQuery);
            onFilteredArticles(response.data);
        } catch (error) {
            console.error('Error searching:', error);
        }
    }


    return (
        <div className="p-2">
            <div className="flex justify-center items-center">
                <SearchBar onFilteredArticles={onFilteredArticles} onFetchAllArticles={fetchAllArticles} onSearch={setOriginalQuery}/>
            </div>
            <h1 className="text-4xl font-semibold py-3 md:py-2 px-4">News Today</h1>
            {isLoading && <div className="flex justify-center items-center h-screen"><Spinner/></div>}
            {!isLoading && currentArticles.length > 0 && (
                <>
                    <div className="flex flex-row justify-center items-center">
                        <div className="flex flex-col justify-center items-center">
                            {showFacets && <FacetList facets={facets} onFacetClick={handleFacetClick} originalQuery={originalQuery}/>}
                        </div>
                        <div
                            className="flex flex-col justify-center items-center md:grid md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 py-3 gap-3 md:p-4">
                            {currentArticles.map((article, index) => (
                                <div className="flex" key={index}>
                                    <ArticleCard article={article}/>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-center items-center mt-2 mb-4">
                        <Pagination total={pages} page={currentPage} onChange={handlePageChange} variant="flat"/>
                    </div>
                </>
            )}
            {!isLoading && currentArticles.length === 0 && (
                <div className="flex justify-center items-center mt-[20%]">
                    <Card>
                        <CardBody>
                            <h1>No articles were found! Please try again later</h1>
                        </CardBody>
                    </Card>
                </div>
            )}
        </div>
    );
}

export default FeedPage;
