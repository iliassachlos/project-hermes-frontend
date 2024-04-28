import {useEffect, useState} from "react";
import axios from "axios";
import {Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";

function EditWebsiteModal({websiteUUID, isEditModalOpen, onEditWebsiteModalHandler}) {
    const [title, setTitle] = useState("");
    const [icon, setIcon] = useState("");
    const [value, setValue] = useState("");

    useEffect(() => {
        fetchWebsite()
    }, []);

    async function fetchWebsite() {
        try {
            const response = await axios.get(`http://localhost:8083/api/scraping/website/${websiteUUID}`)
            setTitle(response.data.title)
            setIcon(response.data.icon)
            setValue(response.data.value)
        } catch (error) {
            console.error(error)
        }
    }

    async function editWebsite() {
        try {
            await axios.put(`http://localhost:8083/api/scraping/website/${websiteUUID}/edit`, {
                title: title,
                icon: icon,
                value: value
            })
        } catch (error) {
            console.log(error)
        } finally {
            onEditWebsiteModalHandler()
        }
    }


    return (
        <Modal isOpen={isEditModalOpen} onOpenChange={onEditWebsiteModalHandler} size="xl" backdrop="opaque">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Edit Website</ModalHeader>
                        <ModalBody>
                            <Input
                                className="my-4"
                                type="text"
                                label="Title"
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                            />
                            <Input
                                className="my-4"
                                type="text"
                                label=" Icon"
                                onChange={(e) => setIcon(e.target.value)}
                                value={icon}
                            />
                            <Input
                                className="my-4"
                                type="text"
                                label="Value"
                                onChange={(e) => setValue(e.target.value)}
                                value={value}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" variant="solid" onPress={editWebsite}>
                                Confirm Edit
                            </Button>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default EditWebsiteModal;