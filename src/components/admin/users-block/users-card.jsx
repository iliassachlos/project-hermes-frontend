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
import UsersBookmarkModal from "@/components/admin/users-block/modals/users-bookmark-modal";

function UsersCard() {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState("");
    const [isUserBookmarkModalOpen, setIsUserBookmarkModalOpen] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetchAllUsers()
    }, []);

    function userBookmarkModalHandler(userId) {
        setSelectedUserId(userId);
        setIsUserBookmarkModalOpen(!isUserBookmarkModalOpen);
    }

    async function fetchAllUsers() {
        try {
            const response = await axios.get('http://localhost:8083/api/users/all');
            switch (response.status) {
                case 200:
                    setUsers(response.data)
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
            {isUserBookmarkModalOpen &&
                <UsersBookmarkModal
                    selectedUserId={selectedUserId}
                    isUserBookmarkModalOpen={isUserBookmarkModalOpen}
                    onBookmarkModalHandler={() => userBookmarkModalHandler(selectedUserId)}
                />
            }
            <Table
                aria-label="websites-table"
                className="my-2"
                radius="md"
            >
                <TableHeader>
                    <TableColumn>Email</TableColumn>
                    <TableColumn>Username</TableColumn>
                    <TableColumn>Password (Encrypted)</TableColumn>
                    <TableColumn>Bookmarked Articles</TableColumn>
                    <TableColumn>Role</TableColumn>
                </TableHeader>
                <TableBody>
                    {errorMessage &&
                        <ErrorAlert message={errorMessage}/>
                    }
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell><h1 className="font-semibold">{user.email}</h1></TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.password.slice(0, 20)} ...</TableCell>
                            <TableCell>
                                <Button
                                    variant="flat"
                                    color="default"
                                    onClick={() => userBookmarkModalHandler(user.id)}
                                >
                                    Show User Bookmarked Articles
                                </Button>
                            </TableCell>
                            <TableCell>
                                {user.isAdmin === false && <Chip variant="flat" color="secondary">User</Chip>}
                                {user.isAdmin === true && <Chip variant="flat" color="warning">Admin</Chip>}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}

export default UsersCard