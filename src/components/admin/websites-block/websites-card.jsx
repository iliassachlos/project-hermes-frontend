import {
    Button,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Tooltip
} from "@nextui-org/react";
import {useEffect, useState} from "react";
import axios from "axios";
import {Image} from "@nextui-org/react";
import {faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import CategoriesModal from "@/components/admin/websites-block/modals/categories-modal";
import EditWebsiteModal from "@/components/admin/websites-block/modals/edit-website-modal";
import ErrorAlert from "@/components/shared/alerts/error-alert";
import DeleteWebsiteModal from "@/components/admin/websites-block/modals/delete-website-modal";

function WebsitesCard() {
    const [websites, setWebsites] = useState([]);
    const [selectedWebsiteUUID, setSelectedWebsiteUUID] = useState("");

    const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetchAllWebsites()
    }, [isCategoriesModalOpen, isEditModalOpen, isDeleteModalOpen]);

    async function fetchAllWebsites() {
        try {
            const response = await axios.get('http://localhost:8083/api/scraping/website');
            switch (response.status) {
                case 200:
                    setWebsites(response.data)
                    break;
                case 404:
                    setErrorMessage("Websites Not Found!")
                    break;
                case 500:
                    setErrorMessage("An error occurred. Please check if scraping service is up")
                    break;
            }
        } catch (error) {
            console.error(error)
        }
    }

    function categoriesModalHandler(websiteUUID) {
        setSelectedWebsiteUUID(websiteUUID)
        setIsCategoriesModalOpen(!isCategoriesModalOpen)
    }

    function editModalHandler(websiteUUID) {
        setSelectedWebsiteUUID(websiteUUID)
        setIsEditModalOpen(!isEditModalOpen)
    }

    function deleteModalHandler(websiteUUID) {
        setSelectedWebsiteUUID(websiteUUID)
        setIsDeleteModalOpen(!isDeleteModalOpen)
    }

    return (
        <>
            {isCategoriesModalOpen &&
                <CategoriesModal
                    websiteUUID={selectedWebsiteUUID}
                    isCategoriesModalOpen={isCategoriesModalOpen}
                    onCategoriesModalHandler={categoriesModalHandler}
                />
            }
            {isEditModalOpen &&
                <EditWebsiteModal
                    websiteUUID={selectedWebsiteUUID}
                    isEditModalOpen={isEditModalOpen}
                    onEditWebsiteModalHandler={editModalHandler}
                />
            }
            {isDeleteModalOpen &&
                <DeleteWebsiteModal
                    websiteUUID={selectedWebsiteUUID}
                    isDeleteModalOpen={isDeleteModalOpen}
                    onDeleteWebsiteModalHandler={deleteModalHandler}
                />
            }
            <Table
                aria-label="websites-table"
                className="my-2"
                radius="md"
            >
                <TableHeader>
                    <TableColumn>Title</TableColumn>
                    <TableColumn>Icon</TableColumn>
                    <TableColumn>Value</TableColumn>
                    <TableColumn>Categories</TableColumn>
                    <TableColumn>Actions</TableColumn>
                </TableHeader>
                <TableBody>
                    {errorMessage &&
                        <ErrorAlert message={errorMessage}/>
                    }
                    {websites.map((website) => (
                        <TableRow key={website.uuid}>
                            <TableCell><h1 className="font-bold">{website.title}</h1></TableCell>
                            <TableCell>
                                <Image
                                    radius="md"
                                    width={25}
                                    alt={website.title + "image"}
                                    src={website.icon}
                                />
                            </TableCell>
                            <TableCell>{website.value}</TableCell>
                            <TableCell>
                                <Button
                                    variant="flat" color="default"
                                    onClick={() => categoriesModalHandler(website.uuid)}
                                >
                                    Add / Delete Categories
                                </Button>
                            </TableCell>
                            <TableCell>
                                <Tooltip content="Edit Website">
                                    <Chip
                                        className="my-2 md:my-0 md:mx-2 cursor-pointer hover:scale-105 ease-in duration-200"
                                        variant="flat"
                                        color="primary"
                                        onClick={() => editModalHandler(website.uuid)
                                        }>
                                        <FontAwesomeIcon radius="md" icon={faPenToSquare}/>
                                    </Chip>
                                </Tooltip>
                                <Tooltip content="Delete Website">
                                    <Chip
                                        className="my-2 md:my-0 md:mx-2 cursor-pointer hover:scale-105 ease-in duration-200"
                                        variant="flat"
                                        color="danger"
                                        onClick={() => deleteModalHandler(website.uuid)}
                                    >
                                        <FontAwesomeIcon radius="md" icon={faTrash}/>
                                    </Chip>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}

export default WebsitesCard