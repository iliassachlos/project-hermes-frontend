import {
    Button, Chip,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader, Spinner,
    Table,
    TableBody, TableCell,
    TableColumn,
    TableHeader, TableRow
} from "@nextui-org/react";
import ErrorAlert from "@/components/shared/alerts/error-alert";
import {useEffect, useState} from "react";
import axios from "axios";
import {useAuth} from "@/context/auth-context";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {tryParsePattern} from "next/dist/build/webpack/plugins/jsconfig-paths-plugin";

function SavedQueriesModal({isOpen, onshowQueryModalHandler, onsetSavedQueryHandler}) {
    const [queries, setQueries] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading,setIsLoading] = useState(true);

    const {userInfo} = useAuth()

    useEffect(() => {
        fetchQueries();
    }, []);

    async function fetchQueries() {
        try {
            const userId = userInfo.id
            const response = await axios.get(`http://localhost:8083/api/users/query/${userId}/all`)
            setQueries(response.data)
        } catch (error) {
            console.log(error);
            setErrorMessage("Failed to fetch queries.");
        }finally {
            setIsLoading(false)
        }
    }

    async function deleteQuery(index) {
        try {
            const userId = userInfo.id
            await axios.delete(`http://localhost:8083/api/users/query/${userId}/${index}/delete`)
        } catch (error) {
            console.log(error);
        }finally {
            fetchQueries();
        }
    }

    function selectQueryForSearch(query) {
        onsetSavedQueryHandler(query)
    }

    return (
        <Modal size="xl" backdrop="blur" isOpen={isOpen} onClose={onshowQueryModalHandler}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Saved Queries</ModalHeader>
                        <ModalBody>
                            {errorMessage && <ErrorAlert message={errorMessage}/>}
                            {isLoading &&
                                <div className="flex justify-center items-center h-screen">
                                    <Spinner/>
                                </div>
                            }
                            {!isLoading && queries.length === 0 &&
                                <div className="flex justify-center items-center p-2">
                                    <Chip variant="flat" color="warning" radius="md">There are no saved queries!</Chip>
                                </div>
                            }
                            {!isLoading && queries.length > 0 && (
                                <Table
                                    aria-label="websites-table"
                                    className="my-2"
                                    radius="md"
                                >
                                    <TableHeader>
                                        <TableColumn>Query</TableColumn>
                                        <TableColumn>Actions</TableColumn>
                                    </TableHeader>
                                    <TableBody>
                                        {queries.map((query, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <Chip
                                                        variant="flat"
                                                        radius="md"
                                                        className="cursor-pointer p-2"
                                                        onClick={() => selectQueryForSearch(query)}
                                                    >
                                                        {query}
                                                    </Chip>
                                                </TableCell>
                                                <TableCell>
                                                    <Chip variant="flat" color="danger" className="cursor-pointer">
                                                        <FontAwesomeIcon
                                                            icon={faTrash}
                                                            onClick={() => deleteQuery(index)}
                                                        />
                                                    </Chip>
                                                </TableCell>
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

export default SavedQueriesModal;
