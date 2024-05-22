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
import {faTrash, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useEffect, useState} from "react";
import axios from "axios";

function SelectorsModal({selectedSelectorUuid, isSelectorModalOpen, onSelectorModalHandler}) {
    const [selector, setSelector] = useState([]);

    const [addSelectorIsSelected, setAddSelectorIsSelected] = useState(false);
    const [newSelector, setNewSelector] = useState("");

    const [infoMessage, setInfoMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetchSelector();
    }, []);

    async function fetchSelector() {
        try {
            const response = await axios.get(`http://localhost:8083/api/scraping/selector/${selectedSelectorUuid}`);
            setSelector(response.data.selectors)
        } catch (error) {
            console.error(error);
        }
    }

    function addSelectedSelectorHandler() {
        setAddSelectorIsSelected(!addSelectorIsSelected);
    }

    async function addSelector() {
        try {
            const response = await axios.post(`http://localhost:8083/api/scraping/selector/${selectedSelectorUuid}/add`, {
                selector: newSelector
            });
            if (response.status === 200) {
                setInfoMessage("Selector added successfully, reload modal to see changes");
            } else {
                setErrorMessage("An error occurred. Please try again");
            }
        } catch (error) {
            console.log(error);
        } finally {
            clearFields();
            fetchSelector();
        }
    }

    async function deleteSelector(index) {
        try {
            const response = await axios.put(`http://localhost:8083/api/scraping/selector/${selectedSelectorUuid}/delete`, {
                selectorIndex: index
            });
            if (response.status === 200) {
                setInfoMessage("Selector deleted successfully, reload modal to see changes");
            } else {
                setErrorMessage("An error occurred. Please try again");
            }
        } catch (error) {
            console.log(error);
        } finally {
            clearFields();
            fetchSelector();
        }
    }

    function clearFields() {
        setNewSelector("");
    }

    return (
        <Modal isOpen={isSelectorModalOpen} onOpenChange={onSelectorModalHandler} size="3xl" backdrop="opaque">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 text-2xl">Selectors</ModalHeader>
                        <ModalBody>
                            <div className="flex gap-3">
                                <Tooltip content="Add New Selector">
                                    <Button
                                        variant="solid"
                                        color="primary"
                                        onClick={() => addSelectedSelectorHandler()}
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
                            {selector.length > 0 &&
                                <Table removeWrapper aria-label="Example static collection table" className="p-2"
                                       radius="md">
                                    <TableHeader>
                                        <TableColumn>Selector</TableColumn>
                                        <TableColumn>Action</TableColumn>
                                    </TableHeader>
                                    <TableBody>
                                        {selector.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <h1>{item}</h1>
                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip content="Delete selector">
                                                        <Chip className="cursor-pointer p-2" variant="flat"
                                                              color="danger"
                                                              onClick={() => deleteSelector(index)}>
                                                            <FontAwesomeIcon icon={faTrash}/>
                                                        </Chip>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        {addSelectorIsSelected && (
                                            <TableRow>
                                                <TableCell>
                                                    <Input
                                                        type="text"
                                                        value={newSelector}
                                                        onChange={(e) => setNewSelector(e.target.value)}
                                                        placeholder="Add selector"
                                                        variant="bordered"
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Button type="button" variant="flat" color="primary"
                                                            onClick={addSelector}>Add</Button>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            }
                            {selector.length === 0 &&
                                <div className="flex justify-center items-center">
                                    <Chip variant="flat" color="warning">
                                        <p>No selectors available</p>
                                    </Chip>
                                </div>
                            }
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
    );
}

export default SelectorsModal;
