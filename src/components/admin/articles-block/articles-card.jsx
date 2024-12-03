import axios from 'axios';
import {
    Chip,
    Image,
    Link,
    Pagination,
    Spinner,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from '@nextui-org/react';
import ErrorAlert from '@/components/shared/alerts/error-alert';
import { useEffect, useMemo, useState } from 'react';
import { Tooltip } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import DeleteArticleModal from '@/components/admin/articles-block/modals/delete-article-modal';
import { categoryColorPicker } from '@/utilities/category-color-picker';

function ArticlesCard() {
    const [articles, setArticles] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const [page, setPage] = useState(1);
    const itemsPerPage = 20;

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedArticleUUID, setSelectedArticleUUID] = useState('');

    const pages = Math.ceil(articles.length / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const items = useMemo(() => articles.slice(startIndex, endIndex), [articles, page]);

    useEffect(() => {
        fetchAllArticles();
    }, [isDeleteModalOpen]);

    async function fetchAllArticles() {
        try {
            const response = await axios.get('http://localhost:8083/api/articles/all');
            switch (response.status) {
                case 200:
                    setArticles(response.data);
                    break;
                case 404:
                    setErrorMessage('Articles Not Found!');
                    break;
                case 500:
                    setErrorMessage('An error occurred. Please check if the service is up');
                    break;
                default:
                    setErrorMessage('An unexpected error occurred');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    function deleteModalHandler(articleUUID = '') {
        setSelectedArticleUUID(articleUUID);
        setIsDeleteModalOpen((prev) => !prev);
    }

    return (
        <>
            {isLoading && (
                <div className='flex justify-center items-center h-screen'>
                    <Spinner />
                </div>
            )}
            {!isLoading && (
                <>
                    <DeleteArticleModal
                        articleUUID={selectedArticleUUID}
                        isDeleteModalOpen={isDeleteModalOpen}
                        onDeleteArticleModalHandler={deleteModalHandler}
                    />
                    <Table
                        aria-label='Articles table'
                        bottomContent={
                            <div className='flex w-full justify-center'>
                                <Pagination
                                    isCompact
                                    showControls
                                    showShadow
                                    color='secondary'
                                    page={page}
                                    total={pages}
                                    onChange={(pageNumber) => {
                                        setPage(pageNumber);
                                        window.scrollTo(0, 0);
                                    }}
                                />
                            </div>
                        }
                        classNames={{
                            wrapper: 'min-h-[222px]',
                        }}
                    >
                        <TableHeader>
                            <TableColumn className='text-center'>Title</TableColumn>
                            <TableColumn className='text-center'>Image</TableColumn>
                            <TableColumn className='text-center'>Content</TableColumn>
                            <TableColumn className='text-center'>URL</TableColumn>
                            <TableColumn className='text-center'>Time</TableColumn>
                            <TableColumn className='text-center'>Source</TableColumn>
                            <TableColumn className='text-center'>Views</TableColumn>
                            <TableColumn className='text-center'>Sentiment Score</TableColumn>
                            <TableColumn className='text-center'>Category</TableColumn>
                            <TableColumn className='text-center'>Actions</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {errorMessage && <ErrorAlert message={errorMessage} />}
                            {items.map((article) => (
                                <TableRow key={article.uuid}>
                                    <TableCell className='text-center'>{article.title}</TableCell>
                                    <TableCell className='text-center'>
                                        <Image width={80} src={article.image} alt={article.title} radius='md' />
                                    </TableCell>
                                    <TableCell className='text-center'>{article.content.slice(0, 20)} ...</TableCell>
                                    <TableCell className='text-center'>
                                        <Link href={article.url} target='_blank'>
                                            {article.url.slice(0, 10)} ...
                                        </Link>
                                    </TableCell>
                                    <TableCell className='text-center'>{article.time}</TableCell>
                                    <TableCell className='text-center'>{article.source}</TableCell>
                                    <TableCell className='text-center'>{article.views}</TableCell>
                                    <TableCell className='text-center'>{article.sentimentScore}</TableCell>
                                    <TableCell className='text-center'>
                                        <Chip variant='flat' className={categoryColorPicker(article.category)}>
                                            {article.category}
                                        </Chip>
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip content='Delete Article'>
                                            <Chip
                                                className='my-2 md:my-0 md:mx-2 cursor-pointer hover:scale-105 ease-in duration-200'
                                                variant='flat'
                                                color='danger'
                                                onClick={() => deleteModalHandler(article.uuid)}
                                            >
                                                <FontAwesomeIcon radius='md' icon={faTrash} />
                                            </Chip>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </>
            )}
        </>
    );
}

export default ArticlesCard;
