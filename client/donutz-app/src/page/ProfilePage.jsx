import { Box, Button, Flex, Heading, Image, Text, IconButton, useToast } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from "../Components/DateFormater"
import ProfilePictureUploadModel from '../Components/ProfilePictureUploadModel';
import { singleuser, updateProfilePic } from '../Redux/Auth/auth.action';

const ProfilePage = () => {
  const [user, setUser] = useState({})
  const [isopenprfile, setIsOpenProfile] = useState(false);
  const userData = useSelector((store) => store.auth.user) || {};
  const toast = useToast();
  const dispatch = useDispatch()

  const handleProfileImageUpdate = async (avatar) => {
    setIsOpenProfile(false)
    if(avatar.length==0){
      toast({
        title: "Error",
        description: "Please Enter the profile url",
        status: "Error",
        duration: 3000,
        isClosable: true,
      });
      return ;
    }
    try {
      const updateduser = await updateProfilePic(avatar)
      if (updateduser?.messege === "profile pic updated successfully") {
        toast({
          title: "Success",
          description: updateduser?.messege,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        dispatch(singleuser());
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
  }

  useEffect(() => {
    if (userData) {
      setUser(userData)
    }
  }, [userData])

  return (
    <Flex direction="column" align="center" p={4}>
      <Box
        p={4}
        borderRadius="md"
        boxShadow="md"
        bgGradient={'linear(to-r, #0f0c29, #302b63, #24243e)'}
        textAlign="center"
        maxW="600px"
        w="100%"
        minH={{ base: '400px', md: '500px' }} 
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Heading as="h1" size="lg" mb={4} color={"white"}>
          Profile
        </Heading>
        <Flex direction="column" alignItems="center" position="relative">
          <Flex position="absolute" top={2} right={10} cursor={"pointer"} onClick={() => setIsOpenProfile(true)}>
            <IconButton
              aria-label="Edit Profile"
              icon={<EditIcon />}
              colorScheme="whiteAlpha"
              bg="transparent"
              borderRadius={"100%"}
            />
          </Flex>
          <Image
            src={user.avatar}
            alt="Profile Picture"
            boxSize={{ base: '100px', md: '150px' }}
            borderRadius="full"
            mb={4}
            border={'3px solid white'}
          />
          <Text fontSize="xl" fontWeight="bold" color={'white'}>
            {`${user?.name} (${user?.role})`}
          </Text>
          <Text fontSize="md" color="whitesmoke" my={2}>
            {user.email}
          </Text>
          <Text fontSize="md" color="whitesmoke">
            Joined on {formatDate(user.createdAt)}
          </Text>
        </Flex>
      </Box>
      <ProfilePictureUploadModel isOpen={isopenprfile} onClose={() => setIsOpenProfile(false)} data={user} handleSubmit={handleProfileImageUpdate} />
    </Flex>
  );
};

export default ProfilePage;
