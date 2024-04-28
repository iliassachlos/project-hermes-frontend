"use client";
import {Button, Card, CardBody, CardFooter, CardHeader, Checkbox, Input, Link} from "@nextui-org/react";
import {useState} from "react";
import axios from "axios";
import {useAuth} from "@/context/auth-context";
import {useRouter} from "next/navigation";
import ErrorAlert from "@/components/shared/alerts/error-alert";

function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [retypedPassword, setRetypedPassword] = useState("");
    const [termsChecked, setTermsChecked] = useState(false);

    const [isEmailInvalid, setIsEmailInvalid] = useState(false);
    const [isPasswordMatching, setIsPasswordMatching] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [registrationError, setRegistrationError] = useState(false);

    const {login} = useAuth();
    const router = useRouter();

    //Checks if email is in valid form
    function emailValidation(email) {
        const regex = /\S+@\S+\.\S+/;
        return regex.test(email);
    }

    //Checks if form is valid for submit
    function formValidationCheck() {
        if (username && email && password && retypedPassword && isPasswordMatching && termsChecked) {
            return true;
        } else {
            return false;
        }
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

    //Checks if password  equals retypedPassword
    function passwordHandler(e) {
        const newValue = e.target.value;
        setPassword(newValue);
        if (newValue === retypedPassword) {
            setIsPasswordMatching(true);
        } else {
            setIsPasswordMatching(false);
        }
    }

    //Checks if retypedPassword equals password
    function retypedPasswordHandler(e) {
        const newValue = e.target.value;
        setRetypedPassword(newValue);
        if (newValue === password) {
            setIsPasswordMatching(true);
        } else {
            setIsPasswordMatching(false);
        }
    }

    function registerSubmitHandler() {
        setIsLoading(true);
        axios
            .post("http://localhost:8083/api/users/register", {username, email, password})
            .then((response) => {
                console.log("User registered successfully", response.data);
                login(response.data.token, response.data.user);
                router.push('/feed');
            })
            .catch((error) => {
                console.error(error);
                setRegistrationError(error.response.data.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <Card radius="md" className="w-[90%] md:w-[60%] lg:w-[40%] 2xl:w-[20%] mb-[30%] md:mb-[10%] p-4">
                <CardHeader className="flex justify-center items-center">
                    <h1 className="text-2xl">Register</h1>
                    {registrationError && <ErrorAlert message={registrationError}/>}
                </CardHeader>
                <CardBody>
                    <Input
                        className="my-4"
                        type="text"
                        label="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                    />
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
                        onChange={passwordHandler}
                        value={password}
                    />
                    <Input
                        className="my-4"
                        type="password"
                        label="Retype Password"
                        isInvalid={!isPasswordMatching}
                        errorMessage={!isPasswordMatching ? "Password does not match" : ""}
                        onChange={retypedPasswordHandler}
                        value={retypedPassword}
                    />
                    <Checkbox isSelected={termsChecked} onValueChange={setTermsChecked}>
                        I agree to the terms and privacy policy
                    </Checkbox>
                </CardBody>
                <CardFooter className="flex flex-col justify-center items-center">
                    <Button
                        type="submit"
                        variant="flat"
                        color="primary"
                        isLoading={isLoading}
                        onClick={registerSubmitHandler}
                        isDisabled={!formValidationCheck()}
                    >
                        Register
                    </Button>
                    <p className="text-sm mt-5">
                        Already have an account?
                        <Link href="/login">
                            <span className="text-sm font-bold mx-1">Login</span>
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}

export default RegisterPage;
