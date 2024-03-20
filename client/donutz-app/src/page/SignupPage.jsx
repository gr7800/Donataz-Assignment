import { useState } from "react";
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Stack,
    Text,
} from "@chakra-ui/react";
import axios from "axios";

import React from 'react'
import { BaseUrl } from "../utills/constans";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isFullNameValid, setIsFullNameValid] = useState(true);

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        const enteredEmail = e.target.value;
        setEmail(enteredEmail);
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsEmailValid(emailPattern.test(enteredEmail));
    }

    const handlePasswordChange = (e) => {
        const enteredPassword = e.target.value;
        setPassword(enteredPassword);
        setIsPasswordValid(enteredPassword.length >= 5);
    }

    const handleFullNameChange = (e) => {
        const enteredName = e.target.value;
        setFullName(enteredName);
        setIsFullNameValid(enteredName.length >= 2)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEmailValid && isFullNameValid && isPasswordValid && fullName.length > 2 && password.length > 4 && email.length > 0) {
            setSubmitting(true);
            try {
                let res = await axios.post(`${BaseUrl}/register`, { name: fullName, email: email, password: password });
                console.log(res);
                if (res?.status===200) {
                    alert(res?.data?.messege);
                    navigate("/login")
                }
            } catch (error) {
                setError(`Error: ${error.response.data.message}`);
                alert(error.response.data.message);
            }
            setSubmitting(false);
        } else {
            alert("Please fill all the field first")
        }
    };

    return (
        <Flex direction={{ base: "column", md: "row" }} >
            <Box
                w={{ base: '100%', md: '50%' }}
                h={{ base: '50vh', md: '100vh' }}
                bgImage="url(https://assets-global.website-files.com/6346ddfc1eff9d04f62cd16c/6346ddfc1eff9d51a82cd2c3_image-6-blog-dark-template.jpg)"
                bgSize="cover"
                bgPosition="center"
            />
            <Box w={{ base: "100%", md: "50%" }} flex="1" py={{ base: 8, md: 16 }} px={{ base: 4, md: 8 }} bg="white" p={"20px"}>
                <Heading as="h2" size="xl" mb={{ base: 8, md: 12 }}>Sign Up</Heading>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={4}>
                        <FormControl isInvalid={!fullName}>
                            <FormLabel htmlFor="fullName">Full name</FormLabel>
                            <Input
                                type="text"
                                name="fullName"
                                value={fullName}
                                onChange={handleFullNameChange}
                                minLength={2}
                            />
                            {!isFullNameValid && (
                                <Text color="red" fontSize="sm" mt={1}>
                                    Please enter a valid Full Name.
                                </Text>
                            )}
                        </FormControl>
                        <FormControl isInvalid={!email}>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <Input
                                name="email"
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                            />
                            {!isEmailValid && (
                                <Text color="red" fontSize="sm" mt={1}>
                                    Please enter a valid email address.
                                </Text>
                            )}
                        </FormControl>
                        <FormControl isInvalid={!password}>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <Input
                                name="password"
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                minLength={5}
                            />
                            {!isPasswordValid && (
                                <Text color="red" fontSize="sm" mt={1}>
                                    Password must be at least 5 characters long.
                                </Text>
                            )}
                        </FormControl>
                        {error && (
                            <Box color="red.500" fontSize="sm">
                                {error}
                            </Box>
                        )}
                        <Button
                            type="submit"
                            isLoading={submitting}
                            loadingText="Submitting..."
                            background={"blue.900"}
                            color={"white"}
                            fontWeight={"bold"}
                            _hover={{ bg: "red" }}
                        >
                            Sign up
                        </Button>
                    </Stack>
                </form>
                <Box display={"flex"} gap={"5px"} justifyContent={"center"}>Already have accout<Text color={"blue"} textDecoration={"underline"}><Link to="/login">Click here</Link></Text></Box>
            </Box>
        </Flex>
    );
}

export default Signup


