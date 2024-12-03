import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

function DeleteWebsiteModal({ websiteUUID, isDeleteModalOpen, onDeleteWebsiteModalHandler }) {
    const [websiteTitle, setWebsiteTitle] = useState('');

    useEffect(() => {
        if (isDeleteModalOpen) {
            fetchWebsiteByUUID();
        }
    }, [isDeleteModalOpen]);

    async function fetchWebsiteByUUID() {
        try {
            const response = await axios.get(`http://localhost:8083/api/scraping/website/${websiteUUID}`);
            setWebsiteTitle(response.data.title);
        } catch (error) {
            console.error(error);
        }
    }

    async function deleteWebsite() {
        try {
            await axios.delete(`http://localhost:8083/api/scraping/website/${websiteUUID}/delete`);
        } catch (error) {
            console.error(error);
        } finally {
            onDeleteWebsiteModalHandler(); // Close the modal after deleting
        }
    }

    return (
        <Modal
            isOpen={isDeleteModalOpen}
            onClose={onDeleteWebsiteModalHandler} // Ensure the parent handler is called on close
            size='xl'
            backdrop='opaque'
        >
            <ModalContent>
                <ModalHeader>Delete Website</ModalHeader>
                <ModalBody>
                    <p>
                        Are you sure you want to delete the website titled {websiteTitle}? This action cannot be undone.
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button color='primary' variant='solid' onPress={deleteWebsite}>
                        Delete Website
                    </Button>
                    <Button color='danger' variant='light' onPress={onDeleteWebsiteModalHandler}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default DeleteWebsiteModal;
