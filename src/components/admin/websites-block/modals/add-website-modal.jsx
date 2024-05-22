import {
    Button,
    Chip, Input, Modal,
    ModalBody,
    ModalContent, ModalFooter,
    ModalHeader,
} from "@nextui-org/react";
import {useState} from "react";
import axios from "axios";

function AddWebsiteModal({isAddWebsiteModalOpen, onAddWebsiteModalHandler}) {
    const [title, setTitle] = useState("");
    const [icon, setIcon] = useState("");
    const [value, setValue] = useState("");

    async function saveWebsite() {
        try {
            await axios.post('http://localhost:8083/api/scraping/website/add', {
                title: title,
                icon: icon,
                value: value
            })
        } catch (error) {
            console.log(error)
        } finally {
            onAddWebsiteModalHandler()
        }
    }

    return (
        <Modal isOpen={isAddWebsiteModalOpen} onOpenChange={onAddWebsiteModalHandler} size="xl" backdrop="opaque">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Add Website</ModalHeader>
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
                            <Button color="primary" variant="solid" onPress={saveWebsite}>
                                Save Website
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

export default AddWebsiteModal