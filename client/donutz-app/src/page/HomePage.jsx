import React, { useEffect, useState } from 'react';
import { deleteAuser, getAllUser, updateAuser } from '../Redux/Auth/auth.action';
import { Box, Button, Flex, Grid, Heading, Image, Text, useToast } from "@chakra-ui/react";
import { FaTrash, FaEdit } from 'react-icons/fa';
import UserUpdateModel from '../Components/UserUpdateModel';

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [isupdatemodel, setIsUpdateModel] = useState(false);
  const [userData, setUaserData] = useState({});
  const toast = useToast();

  const fetchUserDetails = async () => {
    try {
      const user = await getAllUser();
      if (user) {
        setUsers(user);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      toast({
        title: "Error",
        description: error.messege,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  const handleDelete = async (userId) => {
    try {
      const isdeleted = await deleteAuser(userId)
      console.log(isdeleted);
      if (isdeleted === "user deleted successfully") {
        setUsers(isdeleted?.user);
        toast({
          title: "Success",
          description: isdeleted?.messege,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        fetchUserDetails();
        return;
      }
      toast({
        title: "Error",
        description: isdeleted.messege,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;

    } catch (error) {
      console.error("Error fetching user details:", error);
      toast({
        title: "Error",
        description: error.messege,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

  }
  const handleUpdateClick = (user) => {
    setUaserData(user);
    setIsUpdateModel(true);
  }

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handleUpdate = async (user) => {
    // console.log(user)
    setIsUpdateModel(false)
    try {
      const updateduser = await updateAuser(user)
      if (updateduser?.messege === "user updated successfully") {
        toast({
          title: "Success",
          description: updateduser?.messege,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        fetchUserDetails();
        return;
      }
      toast({
        title: "Error",
        description: updateduser?.messege,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;

    } catch (error) {
      console.error("Error fetching user details:", error);
      toast({
        title: "Error",
        description: error.messege,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

  };

  return (
    <Box p={4}>
      <Heading as="h1" size="lg" mb={4}>Users List</Heading>
      <Grid templateColumns={{ base: "1fr", sm: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={4}>
        {users.map((user) => (
          <Box key={user.email} p={4} borderRadius="md" boxShadow="md" bgGradient={"linear(to-r, #0f0c29, #302b63, #24243e)"} >
            <Image src={user.avatar} alt='Profile Picture' boxSize="100px" borderRadius="full" mb={4} mx="auto" border={"3px solid white"} />
            <Text textAlign="center" fontSize="xl" fontWeight="bold" color={"white"}>{`${user?.name} (${user?.role})`}</Text>
            <Text textAlign="center" fontSize="md" color="whitesmoke" mb={4} >{user.email}</Text>
            <Flex justify="space-around"> {/* Adjusted Flex to justify buttons */}
              <Button size="sm" colorScheme="red" onClick={() => handleDelete(user._id)} display="block" leftIcon={<FaTrash />}>Delete</Button>
              <Button size="sm" colorScheme="blue" display="block" leftIcon={<FaEdit />} onClick={() => handleUpdateClick(user)}>Update</Button>
            </Flex>
          </Box>
        ))}
      </Grid>
      <UserUpdateModel isOpen={isupdatemodel} onClose={() => setIsUpdateModel(false)} data={userData} handleSubmit={handleUpdate} />
    </Box>
  )
}

export default HomePage;
