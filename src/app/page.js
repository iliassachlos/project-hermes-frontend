'use client'
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {useAuth} from "@/context/auth-context";

export default function Home() {

    const {isAuthenticated} = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/feed')
        }
    }, [isAuthenticated, router]);

    return (
        <div className="flex justify-center items-center h-screen">
            Home hero page
        </div>
    );
}
