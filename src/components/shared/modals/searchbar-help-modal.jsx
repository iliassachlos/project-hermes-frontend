import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";

function SearchbarHelpModal({onSearchbarHelpHandler, isOpen}) {
    return (
        <Modal size="5xl" backdrop="blur" isOpen={isOpen} onClose={onSearchbarHelpHandler}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Need Help?</ModalHeader>
                        <ModalBody>
                            <h1 className="font-semibold">Let us assist you in the use of the searchbar!</h1>
                            <p>You can use any of the elements of an article <strong>(title, content, time, image,
                                source, category)</strong> followed closely by : and then closely by the term you want
                                to search for </p>
                            <p>After that you can chain multiple such terms and create a more complex query
                                by using the words <strong>&quot;and&quot;, &quot;or&quot; or &quot;not&quot;</strong>
                            </p>
                            <p>Some examples:</p>
                            <ul>
                                <li> - <strong>title:greece and title:education</strong>, will bring back every article
                                    that has <strong>both</strong> greece and education in the title
                                </li>
                                <li> - <strong>title:greece or title:education</strong>, will bring back every article
                                    that has <strong>either</strong> greece or education in the title
                                </li>
                                <li> - <strong>title:greece not title:education</strong>, will bring back every article
                                    that has greece <strong>except</strong> if it also has education in the title
                                </li>
                            </ul>
                            <p className="font-semibold">Be careful, the words in the searchbar must be on lowercase and
                                only one term per element in order to achieve a correct search </p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" variant="flat" onPress={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </>
                )
                }
            </ModalContent>
        </Modal>
    )
}

export default SearchbarHelpModal