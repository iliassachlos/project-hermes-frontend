import {
    Avatar,
    Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle, user
} from "@nextui-org/react";
import Link from "next/link";
import {useEffect, useState} from "react";
import {useAuth} from "@/context/auth-context";
import LogoutModal from "@/components/shared/modals/logout-modal";


function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const {isAuthenticated, logout} = useAuth()
    const {userInfo} = useAuth()

    useEffect(() => {
        setIsMenuOpen(false)
    }, [isAuthenticated, userInfo])

    function handleLogout() {
        setIsLogoutModalOpen(false)
        logout()
    }

    function logoutModalHandler() {
        setIsLogoutModalOpen(!isLogoutModalOpen)
    }

    if (isAuthenticated) {
        console.log(userInfo.username)
    }

    return (
        <>
            <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
                <NavbarBrand>
                    <p className="font-semibold text-xl cursor-pointer hover:scale-105 ease-in duration-200">
                        <Link href={isAuthenticated ? "/feed" : "/"}>
                            Hermes
                        </Link>
                    </p>
                </NavbarBrand>
                <NavbarContent as="div" justify="end">
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as="button"
                                className="transition-transform"
                                color="secondary"
                                size="sm"
                                src="https://static.vecteezy.com/system/resources/previews/020/765/399/large_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
                            />
                        </DropdownTrigger>
                        {/*When user is logged in*/}
                        {isAuthenticated &&
                            <DropdownMenu aria-label="Menu Actions" variant="flat">
                                <DropdownItem key="info" className="mt-1">
                                    <h1>
                                        Welcome back <span className="font-semibold">{userInfo.username}</span> !
                                    </h1>
                                    <Divider className="mt-2"/>
                                </DropdownItem>
                                <DropdownItem key="feed" href="/feed">Feed</DropdownItem>
                                <DropdownItem key="bookmarked-articles" href="/bookmarked-articles">
                                    Bookmarked Articles
                                </DropdownItem>
                                <DropdownItem key="charts" href="/charts">Charts</DropdownItem>
                                <DropdownItem key="logout" onClick={logoutModalHandler}>Logout</DropdownItem>
                            </DropdownMenu>
                        }
                        {/*When user is not logged in*/}
                        {!isAuthenticated &&
                            <DropdownMenu aria-label="Menu Actions" variant="flat">
                                <DropdownItem key="home" href="/">Home</DropdownItem>
                                <DropdownItem key="login" href="/login">Login</DropdownItem>
                                <DropdownItem key="register" href="/register">Register</DropdownItem>
                            </DropdownMenu>
                        }
                    </Dropdown>
                </NavbarContent>
            </Navbar>
            {isLogoutModalOpen &&
                <LogoutModal
                    onHandleLogout={handleLogout}
                    onLogoutModalHandler={logoutModalHandler}
                    isOpen={isLogoutModalOpen}/>
            }
        </>
    )
}

export default Header