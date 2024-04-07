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
import {useState} from "react";


function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const user = true;

    return (
        <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
            <NavbarBrand>
                <p className="font-bold cursor-pointer hover:scale-105 ease-in duration-200">
                    <Link href={user ? "/feed" : "/"}>
                        Hermes
                    </Link>
                </p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {/* When user is logged in */}
                {user &&
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
                {user &&
                    <>
                        <NavbarItem className="hidden lg:flex">
                            <Button color="primary" href="/logout" variant="flat">
                                Log Out
                            </Button>
                        </NavbarItem>
                    </>
                }
                {/* When user is not logged in*/}
                {!user &&
                    <>
                        <NavbarItem className="hidden lg:flex">
                            <Button href="/login" variant="flat" color="primary">
                                Login
                            </Button>
                        </NavbarItem>
                        <NavbarItem className="hidden lg:flex">
                            <Button href="/register" variant="flat" color="primary">
                                Register
                            </Button>
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
                    {user &&
                        <>
                            <NavbarMenuItem className="hover:text-blue-500 ease-in duration-200 text-xl">
                                <Link href="/feed">Feed</Link>
                            </NavbarMenuItem>
                            <NavbarMenuItem className="hover:text-blue-500 ease-in duration-200 text-xl">
                                <Link href="/bookmarked-articles">Bookmarked Articles</Link>
                            </NavbarMenuItem>
                            <NavbarMenuItem className="text-red-500 ease-in duration-200 text-xl">
                                <Link href="/logout">Log Out</Link>
                            </NavbarMenuItem>
                        </>
                    }
                    {/* Where user is not logged in */}
                    {!user &&
                        <>
                            <NavbarMenuItem className="hover:text-blue-500 ease-in duration-200 text-xl">
                                <Link href="/">Home</Link>
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
    )
}

export default Header