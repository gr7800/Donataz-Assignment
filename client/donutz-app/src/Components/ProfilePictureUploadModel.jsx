import React, { useEffect, useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormControl,
    FormLabel,
    Input,
    Button,
    Image,
} from '@chakra-ui/react';

const ProfilePictureUploadModel = ({ isOpen, onClose, data, handleSubmit }) => {
    const [avatar, setAvatar] = useState('');

    useEffect(() => {
        if (data) {
            setAvatar(data.avatar);
        }
    }, [data]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Profile Image</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Image src={avatar} alt="Profile Picture" boxSize="150px" borderRadius="full" mx="auto" />
                    <FormControl mt={4}>
                        <FormLabel>New Profile Picture URL</FormLabel>
                        <Input
                            type="text"
                            value={avatar}
                            onChange={(e) => setAvatar(e.target.value)}
                            placeholder="Enter new image URL"
                        />
                    </FormControl>
                    <Button mt={4} colorScheme="blue" onClick={() => handleSubmit(avatar)}>
                        Submit
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default ProfilePictureUploadModel;
