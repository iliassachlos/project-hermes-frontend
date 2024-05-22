'use client'
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {useAuth} from "@/context/auth-context";
import {Chip} from "@nextui-org/react";
import CountUp from "react-countup";
import CountupCard from "@/components/home/countup-card";

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
            <div className="mb-[10%] p-2">
                <h1 className="text-6xl text-center font-semibold">Hermes</h1>
                <h2 className="text-center">Stay Updated With The Latest Articles From Multiple Sources</h2>
                <div className="flex justify-around items-center rounded-md text-center my-2 p-2">
                    <CountupCard start="0" end="8245" message="Users Now"/>
                    <CountupCard start="0" end="381" message="Articles Available"/>
                </div>
            </div>

        </div>
    );
}
