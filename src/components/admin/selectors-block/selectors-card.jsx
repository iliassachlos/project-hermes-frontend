import {
    Button,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/react";
import {useEffect, useState} from "react";
import axios from "axios";
import ErrorAlert from "@/components/shared/alerts/error-alert";
import SelectorsModal from "@/components/admin/selectors-block/modals/selectors-modal";

function SelectorsCard() {
    const [selectors, setSelectors] = useState([]);
    const [selectedSelectorUuid, setSelectedSelectorUuid] = useState("");
    const [isSelectorsModalOpen, setIsSelectorsModalOpen] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetchAllSelectors()
    }, []);

    function selectorModalHandler(selectorUuid) {
        setSelectedSelectorUuid(selectorUuid);
        setIsSelectorsModalOpen(!isSelectorsModalOpen);
    }

    async function fetchAllSelectors() {
        try {
            const response = await axios.get('http://localhost:8083/api/scraping/selector/all');
            switch (response.status) {
                case 200:
                    setSelectors(response.data)
                    break;
                case 404:
                    setErrorMessage("Websites Not Found!")
                    break;
                case 500:
                    setErrorMessage("An error occurred. Please check if scraping service is up")
                    break;
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            {isSelectorsModalOpen &&
                <SelectorsModal
                    selectedSelectorUuid={selectedSelectorUuid}
                    isSelectorModalOpen={isSelectorsModalOpen}
                    onSelectorModalHandler={() => selectorModalHandler(selectedSelectorUuid)}
                />
            }
            <Table
                aria-label="selectors-table"
                className="my-2"
                radius="md"
            >
                <TableHeader>
                    <TableColumn>Name</TableColumn>
                    <TableColumn>UUID</TableColumn>
                    <TableColumn>Selector Array</TableColumn>
                </TableHeader>
                <TableBody>
                    {errorMessage &&
                        <ErrorAlert message={errorMessage}/>
                    }
                    {selectors.map((selector) => (
                        <TableRow key={selector.uuid}>
                            <TableCell><h1 className="font-semibold">{selector.name}</h1></TableCell>
                            <TableCell>{selector.uuid}</TableCell>
                            <TableCell>
                                <Button
                                    variant="flat"
                                    color="default"
                                    onClick={() => selectorModalHandler(selector.uuid)}
                                >
                                    Show User Bookmarked Articles
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}

export default SelectorsCard