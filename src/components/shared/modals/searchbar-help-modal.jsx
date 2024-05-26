import {Chip, Code, Modal, ModalBody, ModalContent, ModalHeader} from "@nextui-org/react";

function SearchbarHelpModal({onSearchbarHelpHandler, isOpen}) {
    return (
        <Modal size="5xl" backdrop="blur" isOpen={isOpen} onClose={onSearchbarHelpHandler}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 text-xl">Need Help?</ModalHeader>
                        <ModalBody className="text-justify p-6">
                            <h1 className="font-semibold">Let us assist you in the use of the searchbar!</h1>
                            <p>
                                You can use any of the elements of an article
                                <Chip size="sm" className="mx-1">title</Chip>
                                <Chip size="sm" className="mx-1">content</Chip>
                                <Chip size="sm" className="mx-1">time</Chip>
                                <Chip size="sm" className="mx-1">image</Chip>
                                <Chip size="sm" className="mx-1">source</Chip>
                                <Chip size="sm" className="mx-1">category</Chip>
                                followed closely by : and then closely by the term you want to search for
                            </p>
                            <p>
                                After that you can chain multiple such terms and create a more complex query
                                by using the words <Chip>and</Chip>, <Chip>or</Chip> or <Chip>not</Chip>
                            </p>
                            <Chip variant="flat" color="success">Some examples:</Chip>
                            <p>
                                <Code>title:greece AND title:education</Code> will bring back every article that has
                                both greece and education in the title
                            </p>
                            <p>
                                <Code>title:greece OR title:education</Code> will bring back every article
                                that has either greece or education in the title
                            </p>
                            <p>
                                <Code>title:greece NOT title:education</Code> will bring back every article
                                that has greece except if it also has education in the title
                            </p>
                            <div className="flex justify-center items-center font-semibold text-sm mt-4">
                                <Chip variant="flat" color="warning">
                                    Be careful, the words in the searchbar must be on lowercase and
                                    only one term per element in order to achieve a correct search
                                </Chip>
                            </div>

                        </ModalBody>
                    </>
                )
                }
            </ModalContent>
        </Modal>
    )
}

export default SearchbarHelpModal