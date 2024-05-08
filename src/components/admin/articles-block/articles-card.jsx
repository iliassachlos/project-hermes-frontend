import axios from "axios";
import {
    Chip,
    Image,
    Link, Pagination, Spinner,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/react";
import ErrorAlert from "@/components/shared/alerts/error-alert";
import {useEffect, useMemo, useState} from "react";

function ArticlesCard() {
    const [articles, setArticles] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const [page, setPage] = useState(1);
    const itemsPerPage = 20;

    const pages = Math.ceil(articles.length / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const items = useMemo(() => articles.slice(startIndex, endIndex), [articles, page]);

    useEffect(() => {
        fetchAllArticles();
    }, []);

    async function fetchAllArticles() {
        try {
            const response = await axios.get('http://localhost:8083/api/articles/all');
            switch (response.status) {
                case 200:
                    setArticles(response.data);
                    break;
                case 404:
                    setErrorMessage("Websites Not Found!");
                    break;
                case 500:
                    setErrorMessage("An error occurred. Please check if scraping service is up");
                    break;
                default:
                    setErrorMessage("An unexpected error occurred");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false)
        }
    }

    function categoryColorPicker(category) {
        switch (category) {
            case "politics":
                return "bg-blue-200";
            case "economy":
                return "bg-purple-200";
            case "sports":
                return "bg-green-200";
            case "lifestyle":
                return "bg-yellow-200";
            case "health":
                return "bg-cyan-200";
            case "technology":
                return "bg-lime-200";
            default:
                return "bg-gray-200";
        }
    }

    function handlePageChange(pageNumber) {
        setPage(pageNumber)
        window.scrollTo(0, 0)
    }

    return (
        <>
            {isLoading && <div className="flex justify-center items-center h-screen"><Spinner/></div>}
            {!isLoading &&
                <Table
                    aria-label="Articles table"
                    bottomContent={
                        <div className="flex w-full justify-center">
                            <Pagination
                                isCompact
                                showControls
                                showShadow
                                color="secondary"
                                page={page}
                                total={pages}
                                onChange={handlePageChange}
                            />
                        </div>
                    }
                    classNames={{
                        wrapper: "min-h-[222px]",
                    }}
                >
                    <TableHeader>
                        <TableColumn>Title</TableColumn>
                        <TableColumn>Image</TableColumn>
                        <TableColumn>Content</TableColumn>
                        <TableColumn>URL</TableColumn>
                        <TableColumn>Time</TableColumn>
                        <TableColumn>Source</TableColumn>
                        <TableColumn>Views</TableColumn>
                        <TableColumn>Category</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {errorMessage && (
                            <ErrorAlert message={errorMessage}/>
                        )}
                        {items.map((article) => (
                            <TableRow key={article.uuid}>
                                <TableCell className="text-justify">{article.title}</TableCell>
                                <TableCell>
                                    <Image width={80} src={article.image} alt={article.title} radius="md"/>
                                </TableCell>
                                <TableCell className="text-justify">{article.content.slice(0, 20)} ...</TableCell>
                                <TableCell>
                                    <Link href={article.url} target="_blank">{article.url.slice(0, 10)} ...</Link>
                                </TableCell>
                                <TableCell>{article.time}</TableCell>
                                <TableCell>{article.source}</TableCell>
                                <TableCell>{article.views}</TableCell>
                                <TableCell>
                                    <Chip variant="flat" className={categoryColorPicker(article.category)}>
                                        {article.category}
                                    </Chip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            }
        </>
    );
}

export default ArticlesCard;
