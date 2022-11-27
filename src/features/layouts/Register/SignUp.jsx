import React, {useContext, useState} from "react";
import {toast, ToastContainer} from 'react-toastify';

import {
    Box, Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input, InputGroup, InputRightElement,
    Stack,
    Text,
    useColorModeValue
} from "@chakra-ui/react";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";
import { selectAllUsers, useAddUserMutation} from "../../redux/slices/UserSlice";
import {Toast} from "../../components/Toast";
import {Routing} from "../../../Routing";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Regex} from "../../../Regex";
import contextApi from "../../Context/ContextApi";


const SignUp = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState("");
    const [surName, setSurName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const isDisabled = !Regex.email(email) || !Regex.password(password) || !Regex.name(name) || !Regex.name(surName);
    const dispatch = useDispatch();
    const allUsers = useSelector(selectAllUsers);
    const {login, setLogin} = useContext(contextApi)
    const navigate = useNavigate();
    const [AddUserMutation] = useAddUserMutation();
    const submitHandler = (event) => {
        event.preventDefault();
        const user = {
            name: name,
            surname: surName,
            email: email,
            password: password
        }
        const existUser = allUsers.find((user) => user.email === email);
        if (existUser) {
            Toast.error("User already exist");
            return
        }
        try {
            AddUserMutation(user);
            Toast.success("Successfully registered");
            setTimeout(() => {
                Routing.goTo(navigate, "/")
            }, 1500)

        } catch (e) {
            console.error(e);
        }

    }
    return (
        <Flex
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <ToastContainer/>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={5} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Sign up
                    </Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        to enjoy all of our cool features ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <form style={{width: "100%"}} onSubmit={submitHandler}
                          action="src/features/layouts/Register/SignUp">
                        <Stack spacing={4}>

                            <HStack>
                                <Box>
                                    <FormControl id="firstName" isRequired>
                                        <FormLabel>First Name</FormLabel>
                                        <Input value={name} onChange={(e) => {
                                            setName(e.target.value)
                                        }} type="text"/>
                                    </FormControl>
                                </Box>
                                <Box>
                                    <FormControl id="lastName">
                                        <FormLabel>Last Name</FormLabel>
                                        <Input value={surName} onChange={(e) => {
                                            setSurName(e.target.value)
                                        }} type="text"/>
                                    </FormControl>
                                </Box>
                            </HStack>
                            <FormControl id="email" isRequired>
                                <FormLabel>Email address</FormLabel>
                                <Input value={email} onChange={(e) => {
                                    setEmail(e.target.value)
                                }} type="email"/>
                            </FormControl>
                            <FormControl id="password" isRequired>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input value={password} onChange={(e) => {
                                        setPassword(e.target.value)
                                    }} type={showPassword ? 'text' : 'password'}/>
                                    <InputRightElement h={'full'}>
                                        <Button
                                            variant={'ghost'}
                                            onClick={() =>
                                                setShowPassword((showPassword) => !showPassword)
                                            }>
                                            {showPassword ? <AiFillEye className={"eyeIcon"}/> :
                                                <AiFillEyeInvisible className={"eyeIcon"}/>}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Stack spacing={10} pt={2}>
                                <Button
                                    type={"submit"}
                                    loadingText="Submitting"
                                    size="lg"
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                    disabled={isDisabled}
                                >
                                    Sign up
                                </Button>
                            </Stack>

                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Flex>
    );
}
export default SignUp;