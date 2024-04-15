'use client'
import {Button, Card, CardBody, CardFooter, CardHeader, Input} from "@nextui-org/react";
import {useState} from "react";
import {Link} from "@nextui-org/react";
import ErrorAlert from "@/components/shared/alerts/error-alert";
import {useAuth} from "@/context/auth-context";
import {useRouter} from "next/navigation";
import axios from "axios";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [isEmailInvalid, setIsEmailInvalid] = useState(false);
    const [loginError, setLoginError] = useState(false);

    const {login} = useAuth()
    const router = useRouter()

    //Checks if email is in valid form
    function emailValidation(email) {
        const regex = /\S+@\S+\.\S+/;
        return regex.test(email);
    }

    function emailHandler(e) {
        const newValue = e.target.value;
        setEmail(newValue);
        if (!emailValidation(newValue)) {
            setIsEmailInvalid(true);
        } else {
            setIsEmailInvalid(false);
        }
    }

    function formValidationCheck() {
        if (email && password) {
            return true;
        } else {
            return false;
        }
    }

    async function loginFormSubmitHandler(e) {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await axios.post('http://localhost:8081/api/users/login', {email, password});
            login(response.data.token, response.data.user);
            router.push('/feed');
        } catch (error) {
            console.error(error);
            if (error.response.data.message) {
                setLoginError(error.response.data.message)
            }
            setIsLoading(false);
        }
    }


    return (
        <div className="flex justify-center items-center h-screen">
            <Card radius="md" className="w-[90%] md:w-[60%] lg:w-[40%] 2xl:w-[20%] mb-[10%] p-4">
                <CardHeader className="flex flex-col justify-center items-center">
                    <h1 className="text-2xl">Login</h1>
                    {loginError && <ErrorAlert message={loginError}/>}
                </CardHeader>
                <CardBody>
                    <Input
                        className="my-4"
                        type="email"
                        label="Email"
                        isInvalid={isEmailInvalid}
                        errorMessage={isEmailInvalid ? "Enter a valid email" : ""}
                        onChange={emailHandler}
                        value={email}
                    />
                    <Input
                        className="my-4"
                        type="password"
                        label="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </CardBody>
                <CardFooter className="flex flex-col justify-center items-center">
                    <Button
                        type="submit"
                        variant="flat"
                        color="primary"
                        isLoading={isLoading}
                        onClick={loginFormSubmitHandler}
                        isDisabled={!formValidationCheck()}
                    >
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