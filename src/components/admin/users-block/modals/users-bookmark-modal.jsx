import {
    Chip,
    Image,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@nextui-org/react";
import {useEffect, useState} from "react";
import axios from "axios";

function UsersBookmarkModal({selectedUserId, isUserBookmarkModalOpen, onBookmarkModalHandler}) {
    const [bookmarkedArticles, setBookmarkedArticles] = useState([]);

    useEffect(() => {
        fetchBookmarkedArticles();
    }, []);

    async function fetchBookmarkedArticles() {
        try {
            const response = await axios.get(`http://localhost:8083/api/users/bookmark/${selectedUserId}`);
            setBookmarkedArticles(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Modal isOpen={isUserBookmarkModalOpen} onOpenChange={onBookmarkModalHandler} size="5xl" backdrop="opaque">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Show Bookmarked Articles</ModalHeader>
                        <ModalBody>
                            {bookmarkedArticles.length === 0 ? (
                                <div className="flex justify-center items-center">
                                    <Chip size="lg" variant="flat" color="warning">
                                        User does not have any bookmarked articles
                                    </Chip>
                                </div>
                            ) : (
                                <Table
                                    aria-label="websites-table"
                                    className="my-2"
                                    radius="md"
                                >
                                    <TableHeader>
                                        <TableColumn>Title</TableColumn>
                                        <TableColumn>Image</TableColumn>
                                        <TableColumn>Content</TableColumn>
                                        <TableColumn>Time</TableColumn>
                                        <TableColumn>URL</TableColumn>
                                        <TableColumn>Source</TableColumn>
                                        <TableColumn>Views</TableColumn>
                                        <TableColumn>Category</TableColumn>
                                    </TableHeader>
                                    <TableBody>
                                        {bookmarkedArticles.map((bookmarkedArticle) => (
                                            <TableRow key={bookmarkedArticle.uuid}>
                                                <TableCell>
                                                    <h1 className="font-semibold">{bookmarkedArticle.title}</h1>
                                                </TableCell>
                                                <TableCell>
                                                    <Image src={bookmarkedArticle.image} alt="article-image"
                                                           radius="md"/>
                                                </TableCell>
                                                <TableCell>{bookmarkedArticle.content.slice(0, 10)}</TableCell>
                                                <TableCell>{bookmarkedArticle.time}</TableCell>
                                                <TableCell><h1 className="text-blue-500">{bookmarkedArticle.url}</h1>
                                                </TableCell>
                                                <TableCell>{bookmarkedArticle.source}</TableCell>
                                                <TableCell>{bookmarkedArticle.views}</TableCell>
                                                <TableCell>{bookmarkedArticle.category}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

export default UsersBookmarkModal;
