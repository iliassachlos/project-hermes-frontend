'use client'
import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function Home() {
    const user = true

    const router = useRouter()

    useEffect(() => {
        if (user) {
            router.push("/feed");
        }
    }, [user, router]);

    return (
        <div className="flex justify-center items-center h-screen">
            Home hero page
        </div>
    );
}
