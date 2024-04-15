import {
    Button,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle
} from "@nextui-org/react";
import Link from "next/link";
import {useEffect, useState} from "react";
import {useAuth} from "@/context/auth-context";
import LogoutModal from "@/components/shared/modals/logout-modal";


function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const {isAuthenticated, logout} = useAuth()

    useEffect(() => {
        setIsMenuOpen(false)
    }, [isAuthenticated])

    function handleLogout() {
        setIsLogoutModalOpen(false)
        logout()
    }

    function logoutModalHandler() {
        setIsLogoutModalOpen(!isLogoutModalOpen)
    }

    return (
        <>
            <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
                <NavbarBrand>
                    <p className="font-bold cursor-pointer hover:scale-105 ease-in duration-200">
                        <Link href={isAuthenticated ? "/feed" : "/"}>
                            Hermes
                        </Link>
                    </p>
                </NavbarBrand>
                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    {/* When user is logged in */}
                    {isAuthenticated &&
                        <>
                            <NavbarItem isActive>
                                <Link href="/feed" aria-current="page">
                                    Feed
                                </Link>
                            </NavbarItem>
                            <NavbarItem>
                                <Link href="/bookmarked-articles" color="foreground">
                                    Bookmarks
                                </Link>
                            </NavbarItem>
                        </>
                    }
                </NavbarContent>
                {/* Desktop menu */}
                <NavbarContent justify="end">
                    {/* When user is logged in */}
                    {isAuthenticated &&
                        <>
                            <NavbarItem className="hidden lg:flex">
                                <Button color="primary" variant="flat" onClick={logoutModalHandler}>
                                    Log Out
                                </Button>
                            </NavbarItem>
                        </>
                    }
                    {/* When user is not logged in*/}
                    {!isAuthenticated &&
                        <>
                            <NavbarItem className="hidden lg:flex">
                                <Link href="/login">
                                    <Button variant="flat" color="primary">
                                        Login
                                    </Button>
                                </Link>
                            </NavbarItem>
                            <NavbarItem className="hidden lg:flex">
                                <Link href="/register">
                                    <Button variant="flat" color="primary">
                                        Register
                                    </Button>
                                </Link>
                            </NavbarItem>
                        </>
                    }
                    <NavbarMenuToggle
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        className="sm:hidden"
                    />
                    {/* Mobile menu */}
                    <NavbarMenu>
                        {/* When user is logged in */}
                        {isAuthenticated &&
                            <>
                                <NavbarMenuItem className="hover:text-blue-500 ease-in duration-200 text-xl">
                                    <Link href="/feed">Feed</Link>
                                </NavbarMenuItem>
                                <NavbarMenuItem className="hover:text-blue-500 ease-in duration-200 text-xl">
                                    <Link href="/bookmarked-articles">Bookmarked Articles</Link>
                                </NavbarMenuItem>
                                <NavbarMenuItem
                                    className="text-red-500 ease-in duration-200 text-xl"
                                    onClick={logoutModalHandler}
                                >
                                    Log Out
                                </NavbarMenuItem>
                            </>
                        }
                        {/* When user is not logged in */}
                        {!isAuthenticated &&
                            <>
                                <NavbarMenuItem className="hover:text-blue-500 ease-in duration-200 text-xl">
                                    <Link href="/public">Home</Link>
                                </NavbarMenuItem>
                                <NavbarMenuItem className="hover:text-blue-500 ease-in duration-200 text-xl">
                                    <Link href="/login">Login</Link>
                                </NavbarMenuItem>
                                <NavbarMenuItem className="hover:text-blue-500 ease-in duration-200 text-xl">
                                    <Link href="/register">Register</Link>
                                </NavbarMenuItem>
                            </>
                        }
                    </NavbarMenu>
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