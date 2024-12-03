import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

function DeleteArticleModal({ articleUUID, isDeleteModalOpen, onDeleteArticleModalHandler }) {
    const [articleTitle, setArticleTitle] = useState('');

    useEffect(() => {
        if (isDeleteModalOpen) {
            fetchArticleByUUID();
        }
    }, [isDeleteModalOpen]);

    async function fetchArticleByUUID() {
        try {
            const response = await axios.get(`http://localhost:8083/api/articles/${articleUUID}`);
            setArticleTitle(response.data.title);
        } catch (error) {
            console.error(error);
        }
    }

    async function deleteArticle() {
        try {
            await axios.delete(`http://localhost:8083/api/articles/${articleUUID}/delete`);
        } catch (error) {
            console.error(error);
        } finally {
            onDeleteArticleModalHandler(); // Close the modal after deleting
        }
    }

    return (
        <Modal isOpen={isDeleteModalOpen} onClose={onDeleteArticleModalHandler} size='xl' backdrop='opaque'>
            <ModalContent>
                <ModalHeader>Delete Article</ModalHeader>
                <ModalBody>
                    <p>
                        Are you sure you want to delete the article titled {articleTitle}? This action cannot be
                        undone.
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button color='primary' variant='solid' onPress={deleteArticle}>
                        Delete Article
                    </Button>
                    <Button color='danger' variant='light' onPress={onDeleteArticleModalHandler}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default DeleteArticleModal;
