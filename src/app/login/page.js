'use client'


import {Button, Card, CardBody, CardFooter, CardHeader, Input} from "@nextui-org/react";
import {useState} from "react";
import {Link} from "@nextui-org/react";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isEmailInvalid, setIsEmailInvalid] = useState(false);
    const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    function loginSubmitHandler() {
        //todo: Login logic
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <Card radius="md" className="w-[90%] md:w-[60%] lg:w-[40%] 2xl:w-[20%] mb-[10%] p-4">
                <CardHeader className="flex justify-center items-center">
                    <h1 className="text-2xl">Login</h1>
                </CardHeader>
                <CardBody>
                    <Input
                        className="my-4"
                        type="email"
                        label="Email"
                        isInvalid={isEmailInvalid}
                        errorMessage={isEmailInvalid ? "Enter a valid email" : ""}
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <Input
                        className="my-4"
                        label="Password"
                        isInvalid={isPasswordInvalid}
                        errorMessage={isPasswordInvalid ? "Enter a valid password" : ""}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </CardBody>
                <CardFooter className="flex flex-col justify-center items-center">
                    <Button type="submit" variant="flat" color="primary" isLoading={isLoading}
                            onClick={loginSubmitHandler}>
                        Login
                    </Button>
                    <p className="text-sm mt-5">
                        Dont have an account?
                        <Link href="/register">
                            <span className="text-sm font-bold mx-1">Register</span>
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}

export default LoginPage