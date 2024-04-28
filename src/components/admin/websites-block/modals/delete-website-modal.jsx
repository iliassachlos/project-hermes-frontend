import {Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import axios from "axios";
import {useEffect, useState} from "react";

function DeleteWebsiteModal({websiteUUID, isDeleteModalOpen, onDeleteWebsiteModalHandler}) {
    const [websiteTitle, setWebsiteTitle] = useState("");

    useEffect(() => {
        fetchWebsiteByUUID();
    }, []);

    async function fetchWebsiteByUUID() {
        try {
            const response = await axios.get(`http://localhost:8083/api/scraping/website/${websiteUUID}`)
            setWebsiteTitle(response.data.title)
        } catch (error) {
            console.error(error)
        }
    }

    async function deleteWebsite() {
        try {
            await axios.delete(`http://localhost:8083/api/scraping/website/${websiteUUID}/delete`)
        } catch (error) {
            console.error(error)
        } finally {
            onDeleteWebsiteModalHandler()
        }
    }

    return (
        <Modal isOpen={isDeleteModalOpen} size="xl" backdrop="opaque">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Delete Website</ModalHeader>
                        <ModalBody>
                            <p>Are you sure you want to delete website with title: {websiteTitle}? Changes cannot be
                                revert</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" variant="solid" onPress={deleteWebsite}>
                                Delete Website
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

export default DeleteWebsiteModal