import { Box, Flex, Spacer, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isScrolled, setIsScrolled] = useState(false);
    const isAuth = useSelector((store) => store.auth.isAuth);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleLogin = () => {
        if (isAuth) {
            localStorage.removeItem("token");
            window.location.reload();
        } else {
            navigate("/login");
        }
    }

    return (
        <Flex
            position={"sticky"}
            top={"0"}
            left={"0"}
            right={"0"}
            zIndex={"100"}
            as={"nav"}
            align={"center"}
            justify={"space-between"}
            wrap={"wrap"}
            bgGradient={"linear(to-r, #0f0c29, #302b63, #24243e)"}
            color={"white"}
            padding={"10px 10px "}
            boxShadow={"md"}
            transition={"background-color 0.3s ease, padding 0.3s ease"}
            backgroundColor={isScrolled ? "black" : "transparent"}
        >
            <Flex align="center">
                <Box>
                    <Link to={"/"}>
                        <img
                            src="https://assets-global.website-files.com/6346ddfc1eff9df53b2cd15c/65ca7725ecab591fc1373a94_Donatuz%20(4.366%20x%201.138%20cm).png"
                            alt="Logo"
                            width={"200px"}
                            height={"50px"}
                            rounded="full"
                        />
                    </Link>
                </Box>
            </Flex>
            <Spacer />

            <Box display={{ base: "block", md: "none" }} onClick={isOpen ? onClose : onOpen}>
                {isOpen ? <CloseIcon color="white" size="24px" /> : <HamburgerIcon color="white" size="24px" />}
            </Box>

            <Box
                display={{ base: isOpen ? "flex" : "none", md: "flex" }}
                flexDirection={{ base: "column", md: "row" }}
                width={{ base: "full", md: "auto" }}
                alignItems={{ base: "center", md: "stretch" }}
                flexGrow={1}
                mt={{ base: 2, md: 0 }}
                justifyContent={{ base: "flex-start", md: "flex-end" }}
            >
                <Box
                    padding={2}
                    marginLeft={{ base: 0, md: 6 }}
                    _hover={{ bg: "white", color: "blue", fontWeight: "bold" }}
                    onClick={handleLogin}
                >
                    {isAuth ? "Logout" : "Login"}
                </Box>
                <Box
                    padding={2}
                    marginLeft={{ base: 0, md: 6 }}
                    _hover={{ bg: "white", color: "blue", fontWeight: "bold" }}
                    color={location.pathname === "/signup" ? "aqua" : "white"}
                >
                    <Link
                        to="/profile"
                        fontSize="xl"
                        fontWeight="bold"
                        textTransform="uppercase"
                        letterSpacing="wide"
                    >
                        Profile
                    </Link>
                </Box>
                <Box
                    padding={2}
                    marginLeft={{ base: 0, md: 6 }}
                    _hover={{ bg: "white", color: "blue", fontWeight: "bold" }}
                    color={location.pathname === "/signup" ? "aqua" : "white"}
                >
                    <Link
                        to="/signup"
                        fontSize="xl"
                        fontWeight="bold"
                        textTransform="uppercase"
                        letterSpacing="wide"
                    >
                        Signup
                    </Link>
                </Box>
            </Box>
        </Flex>
    )
}

export default Navbar
