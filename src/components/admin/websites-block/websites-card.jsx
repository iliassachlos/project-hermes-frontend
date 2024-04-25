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
import CategoriesModal from "@/components/admin/websites-block/categories-modal";

function WebsitesCard() {
    const [websites, setWebsites] = useState([]);
    const [selectedWebsiteUUID, setSelectedWebsiteUUID] = useState("");

    const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false);

    useEffect(() => {
        fetchAllWebsites()
    }, []);

    async function fetchAllWebsites() {
        try {
            const response = await axios.get('http://localhost:8083/api/scraping/website');
            setWebsites(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    function categoriesModalHandler(websiteUUID) {
        setSelectedWebsiteUUID(websiteUUID)
        setIsCategoriesModalOpen(!isCategoriesModalOpen)
    }

    return (
        <>
            {isCategoriesModalOpen &&
                <CategoriesModal
                    isCategoriesModalOpen={isCategoriesModalOpen}
                    onCategoriesModalHandler={categoriesModalHandler}
                    websiteUUID={selectedWebsiteUUID}
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
                                    View Categories
                                </Button>
                            </TableCell>
                            <TableCell>
                                <Tooltip content="Edit Website">
                                    <Chip
                                        className="my-2 md:my-0 md:mx-2 cursor-pointer hover:scale-105 ease-in duration-200"
                                        variant="flat" color="primary">
                                        <FontAwesomeIcon radius="md" icon={faPenToSquare}/>
                                    </Chip>
                                </Tooltip>
                                <Tooltip content="Delete Website">
                                    <Chip
                                        className="my-2 md:my-0 md:mx-2 cursor-pointer hover:scale-105 ease-in duration-200"
                                        variant="flat" color="danger">
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