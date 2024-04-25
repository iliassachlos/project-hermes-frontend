import {
    Button, Chip, Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Table, TableBody, TableCell,
    TableColumn,
    TableHeader, TableRow, Tooltip
} from "@nextui-org/react";
import Link from "next/link";
import {faTrash, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useEffect, useState} from "react";
import axios from "axios";

function CategoriesModal({isCategoriesModalOpen, onCategoriesModalHandler, websiteUUID}) {
    const [website, setWebsite] = useState({})
    const [addCategoryIsSelected, setAddCategoryIsSelected] = useState(false)
    const [newCategory, setNewCategory] = useState("")
    const [newUrl, setNewUrl] = useState("")
    const [infoMessage, setInfoMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        fetchWebsiteByUUID();
    }, [websiteUUID]);

    async function fetchWebsiteByUUID() {
        try {
            const response = await axios.get(`http://localhost:8083/api/scraping/website/${websiteUUID}`)
            setWebsite(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    function addSelectedCategoryHandler() {
        setAddCategoryIsSelected(!addCategoryIsSelected)
    }

    async function addCategory() {
        try {
            const response = await axios.post('http://localhost:8083/api/scraping/website/category/add', {
                id: websiteUUID,
                category: newCategory,
                url: newUrl
            })
            if (response.status === 200) {
                setInfoMessage("Category added successfully, reload modal to see changes")
            } else {
                setErrorMessage("An error occurred. Please try again")
            }
        } catch (error) {
            console.log(error)
        } finally {
            clearFields()
            fetchWebsiteByUUID()
        }
    }

    async function deleteCategory(index) {
        // try {
        //     const updatedCategories = categoriesArray.filter((item, itemIndex) => itemIndex !== index)[0];
        //     const response = await axios.put('http://localhost:8083/api/scraping/website/category/delete', {
        //         id: websiteUUID,
        //         categories: updatedCategories
        //     })
        //     if (response.status === 200) {
        //         setInfoMessage("Category deleted successfully, reload modal to see changes")
        //     } else {
        //         setErrorMessage("An error occurred. Please try again")
        //     }
        // } catch (error) {
        //     console.log(error)
        // } finally {
        //     clearFields()
        //     fetchWebsiteByUUID()
        // }
    }

    function clearFields() {
        setNewCategory("")
        setNewUrl("")
    }

    const categoriesArray = Object.entries(website.categories || {}).map(([category, url]) => ({category, url}));

    return (
        <Modal isOpen={isCategoriesModalOpen} onOpenChange={onCategoriesModalHandler} size="3xl" backdrop="opaque">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 text-2xl">{website.title} Categories</ModalHeader>
                        <ModalBody>
                            <div className="flex gap-3">
                                <Tooltip content="Add New Category">
                                    <Button
                                        variant="solid"
                                        color="primary"
                                        onClick={() => addSelectedCategoryHandler()}
                                    >
                                        <FontAwesomeIcon icon={faPlus}/>
                                    </Button>
                                </Tooltip>
                            </div>
                            {infoMessage &&
                                <div className="flex justify-center items-center">
                                    <Chip className="p-2" radius="md" variant="flat"
                                          color="success">{infoMessage}</Chip>
                                </div>
                            }
                            {errorMessage &&
                                <div className="flex justify-center items-center">
                                    <Chip className="p-2" radius="md" variant="flat"
                                          color="danger">{errorMessage}</Chip>
                                </div>
                            }
                            <Table removeWrapper aria-label="Example static collection table" className="p-2"
                                   radius="md">
                                <TableHeader>
                                    <TableColumn>Category</TableColumn>
                                    <TableColumn>Website URL</TableColumn>
                                    <TableColumn>Action</TableColumn> {/* New column for Action */}
                                </TableHeader>
                                <TableBody>
                                    {categoriesArray.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <h1>{item.category}</h1>
                                            </TableCell>
                                            <TableCell>
                                                <Link href={item.url} passHref target="_blank">
                                                    <h1 className="text-blue-700">{item.url}</h1>
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <Tooltip content="Delete category">
                                                    <Chip className="cursor-pointer p-2" variant="flat" color="danger"
                                                          onClick={() => deleteCategory(index)}>
                                                        <FontAwesomeIcon icon={faTrash}/>
                                                    </Chip>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {addCategoryIsSelected && (
                                        <TableRow>
                                            <TableCell>
                                                <Input
                                                    type="text"
                                                    value={newCategory}
                                                    onChange={(e) => setNewCategory(e.target.value)}
                                                    placeholder="Add category"
                                                    variant="bordered"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Input
                                                    type="text"
                                                    value={newUrl}
                                                    onChange={(e) => setNewUrl(e.target.value)}
                                                    placeholder="Add URL"
                                                    variant="bordered"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Button type="button" variant="flat" color="primary"
                                                        onClick={addCategory}>Add</Button>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default CategoriesModal;
