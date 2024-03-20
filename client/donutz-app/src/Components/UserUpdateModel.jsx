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
    Select,
    Toast,
} from '@chakra-ui/react';
import { deleteAuser, updateAuser } from '../Redux/Auth/auth.action';

const UserUpdateModel = ({ isOpen, onClose, data, handleSubmit }) => {
    const [user, setUser] = useState(data || {});


    useEffect(() => {
        setUser(data);
    }, [data])

    const handleChange = (e) => {
        let name = e.target?.name;
        let value = e?.target?.value;
        setUser((prev) => ({ ...prev, [name]: value }));
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Update User</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>Profile Image URL</FormLabel>
                        <Input
                            type="text"
                            name="avatar"
                            value={user?.avatar}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Name</FormLabel>
                        <Input
                            type="text"
                            name="name"
                            value={user?.name}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Role</FormLabel>
                        <Select name="role" value={user?.role} onChange={handleChange}>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </Select>
                    </FormControl>
                    <Button mt={4} colorScheme="blue" onClick={() => handleSubmit(user)}>
                        Submit
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default UserUpdateModel;
