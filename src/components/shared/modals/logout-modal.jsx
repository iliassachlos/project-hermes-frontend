import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";

function LogoutModal({onHandleLogout, onLogoutModalHandler, isOpen}) {
    return (
        <Modal size="xl" backdrop="blur" isOpen={isOpen} onClose={onLogoutModalHandler}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Logging Out</ModalHeader>
                        <ModalBody>
                            <h1>Are you sure you want to logout?</h1>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Close
                            </Button>
                            <Button color="primary" onPress={onHandleLogout}>
                                Logout
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default LogoutModal;