import { useState, useEffect } from "react";
import { Flex, Box, Heading, FormControl, FormLabel, Input, Button, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, useDisclosure, useToast } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetOtp, forgetpassword, login } from "../Redux/Auth/auth.action";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isEmailValid, setEmailValid] = useState(true);
    const [isPasswordValid, setPasswordValid] = useState(true);

    const isAuth = useSelector((store) => store.auth.isAuth);
    console.log(isAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
    const [forgotPasswordSecretKey, setForgotPasswordSecretKey] = useState("");
    const [isFEmailValid, setFEmailValid] = useState(true);
    const [isFPasswordValid, setFPasswordValid] = useState(true);
    const [isOtpValid, setOtpisValid] = useState(true);
    const [newPassword, setNewPassword] = useState("");
    const [otp, setOtp] = useState("123456");
    const toast = useToast()

    const handleSendOtp = async (e) => {
        e.preventDefault()
        const creds = { email: forgotPasswordEmail }
        if (isFEmailValid) {
            const res = await GetOtp(creds);
            // console.log(res)

            if (res?.messege === "OTP send to email successfully it is valid for 5 minute") {
                setOtp(res?.otp)
                toast({
                    title: 'Otp',
                    description: res.messege,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: 'Error',
                    description: res.messege,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
            }
        } else {
            toast({
                title: 'Email Validiation',
                description: 'Enter valid Email',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleLoginSubmit = async(event) => {
        event.preventDefault();
        if (isEmailValid && isPasswordValid) {
             dispatch(login({ email: email, password: password }));
        } else {
            toast({
                title: "Error",
                description: "Please fill all details properly",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleForgotPasswordSubmit = async (event) => {
        event.preventDefault();
        if (otp === forgotPasswordSecretKey && isOtpValid && isFEmailValid && isFPasswordValid) {
            const data = {
                email: forgotPasswordEmail,
                otp: forgotPasswordSecretKey,
                newPassword: newPassword,
            };
            let res = await forgetpassword(data);
            console.log(res)
            if (res) {
                onClose();
                toast({
                    title: 'Password',
                    description: res.message,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            }
        } else {
            alert("Please fill all details properly");
        }
    };

    useEffect(() => {
        if (isAuth) {
            navigate("/");
        }
    }, [isAuth, navigate]);

    const handleEmailChange = (e) => {
        const enteredEmail = e.target.value;
        setEmail(enteredEmail);
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailValid(emailPattern.test(enteredEmail));
    }

    const handlePasswordChange = (e) => {
        const enteredPassword = e.target.value;
        setPassword(enteredPassword);
        setPasswordValid(enteredPassword.length >= 5);
    }

    const handleForgotPasswordChange = (e) => {
        const enteredPassword = e.target.value;
        setNewPassword(enteredPassword);
        if (enteredPassword.length >= 5) {
            setFPasswordValid(true)
        } else {
            setFPasswordValid(false)
        }
    }

    const handleForgetPasswordEmail = (e) => {
        const enteredEmail = e.target.value;
        setForgotPasswordEmail(enteredEmail);
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setFEmailValid(emailPattern.test(enteredEmail));
    }

    const handleOtpValid = (e) => {
        const enteredOtp = e.target.value;
        const otpPattern = /^[0-9]{0,6}$/; // Regular expression for 6-digit numbers
        if (otpPattern.test(enteredOtp)) {
            setForgotPasswordSecretKey(enteredOtp);
            setOtpisValid(true);
        } else {
            setOtpisValid(false);
        }
    }


    return (
        <Flex direction={{ base: "column", md: "row" }}>
            <Box
                w={{ base: '100%', md: '50%' }}
                h={{ base: '50vh', md: '100vh' }}
                bgImage="url(https://assets-global.website-files.com/6346ddfc1eff9d04f62cd16c/6346ddfc1eff9d51a82cd2c3_image-6-blog-dark-template.jpg)"
                bgSize="cover"
                bgPosition="center"
            />
            <Box w={{ base: "100%", md: "50%" }} flex="1" py={{ base: 8, md: 16 }} px={{ base: 4, md: 8 }} bg="white">
                <Heading as="h2" size="xl" mb={{ base: 8, md: 12 }}>
                    Log In
                </Heading>
                <form onSubmit={handleLoginSubmit}>
                    <FormControl id="email" mb={4}>
                        <FormLabel>Email</FormLabel>
                        <Input type="text" value={email} onChange={handleEmailChange} />
                        {!isEmailValid && (
                            <Text color="red" fontSize="sm" mt={1}>
                                Please enter a valid email address.
                            </Text>
                        )}
                    </FormControl>
                    <Text
                        width={"100%"}
                        textAlign={"right"}
                        fontWeight={"normal"}
                        _hover={{ color: "red" }}
                        color={"blue"}
                        lineHeight={"0p"}
                        textDecoration={"underline"}
                        onClick={onOpen}
                        cursor="pointer"
                        padding={"5px"}
                        mb={"-5px"}
                    >
                        Forget Password
                    </Text>
                    <FormControl id="password" mb={4}>
                        <FormLabel>Password</FormLabel>
                        <Input type="password" value={password} onChange={handlePasswordChange} />
                        {!isPasswordValid && (
                            <Text color="red" fontSize="sm" mt={1}>
                                Password must be at least 5 characters long.
                            </Text>
                        )}
                    </FormControl>
                    <Button type="submit" colorScheme="blue" width="100%" mb={6}>
                        Log In
                    </Button>
                </form>
                <Text>
                    Don't have an account?{" "}
                    <Link to="/signup" color="blue" fontWeight="bold">
                        Sign Up
                    </Link>
                </Text>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Forgot Password?</ModalHeader>
                    <ModalBody>
                        <form onSubmit={handleForgotPasswordSubmit}>
                            <FormControl id="forgotPasswordEmail" mb={4}>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    type="text"
                                    value={forgotPasswordEmail}
                                    onChange={handleForgetPasswordEmail}
                                />
                                {!isFEmailValid && (
                                    <Text color="red" fontSize="sm" mt={1}>
                                        Please enter a valid email address.
                                    </Text>
                                )}
                            </FormControl>
                            <Box display={"flex"} w={"100%"} justifyContent={"right"}>
                                <Button type="button" onClick={handleSendOtp} colorScheme="blue" _hover={{ color: "red" }} variant={"link"}>
                                    Send Otp
                                </Button>
                            </Box>
                            <FormControl id="forgotPasswordSecretKey" mb={4}>
                                <FormLabel>Otp</FormLabel>
                                <Input
                                    type="text"
                                    value={forgotPasswordSecretKey}
                                    onChange={handleOtpValid}
                                    maxLength={6}
                                />
                                {(otp === forgotPasswordSecretKey && isOtpValid) ? (
                                    <Text color="blue" fontSize="sm" mt={1}>
                                        Otp validated !
                                    </Text>
                                ) : (isOtpValid && otp !== forgotPasswordSecretKey) && (
                                    <Text color="red" fontSize="sm" mt={1}>
                                        Invalid Otp !
                                    </Text>
                                )}
                            </FormControl>
                            <FormControl id="newPassword" mb={4}>
                                <FormLabel>New Password</FormLabel>
                                <Input
                                    type="password"
                                    value={newPassword}
                                    onChange={handleForgotPasswordChange}
                                    minLength={5}
                                />
                                {!isFPasswordValid && (
                                    <Text color="red" fontSize="sm" mt={1}>
                                        Password must be at least 5 characters long.
                                    </Text>
                                )}
                            </FormControl>
                            <Button type="submit" colorScheme="blue" width="100%" mb={6}>
                                Reset Password
                            </Button>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="gray" mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    );
}
export default LoginPage;