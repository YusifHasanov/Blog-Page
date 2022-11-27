import {
    Box, Button, Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link,
    Stack,
    Text,
    useColorModeValue
} from "@chakra-ui/react";
import {ToastContainer} from 'react-toastify';
import React, {useContext, useState} from "react";
import {selectAllUsers} from "../../redux/slices/UserSlice";
import {Toast} from "../../components/Toast";
import {useNavigate} from "react-router-dom";
import {Routing} from "../../../Routing";
import {useSelector} from "react-redux";
import {Regex} from "../../../Regex";
import ContextApi from "../../Context/ContextApi";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const isDisabled = !Regex.email(email) || !Regex.password(password);
    const allUsers = useSelector(selectAllUsers);

    const {login, setLogin} = useContext(ContextApi);
    const navigate = useNavigate();
    const signInHandler = (event) => {
        event.preventDefault();
        const existUser = allUsers.find((user) => user.email === email && user.password === password);
        console.log(existUser)
        if (existUser) {
            Toast.success("Successfully logged in");
            setLogin(existUser.id);
            setTimeout(() => Routing.goTo(navigate, "/"), 1500)
            return
        }
        Toast.error("User not found");
    }
    return (
        <Flex
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <ToastContainer/>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={10} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        to enjoy all of our cool features ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <form onSubmit={signInHandler} action="src/features/layouts/Register/SignIn">
                        <Stack spacing={4}>

                            <FormControl id="email">
                                <FormLabel>Email address</FormLabel>
                                <Input id={'signInEMail'} value={email} onChange={(e) => {
                                    setEmail(e.target.value)
                                }} type="email"/>
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <Input id={'signInPassword'} value={password} onChange={(e) => {
                                    setPassword(e.target.value)
                                }} type="password"/>
                            </FormControl>
                            <Stack spacing={10}>
                                <Stack
                                    direction={{base: 'column', sm: 'row'}}
                                    align={'start'}
                                    justify={'space-between'}>
                                    <Checkbox>Remember me</Checkbox>
                                    <Link color={'blue.400'}>Forgot password?</Link>
                                </Stack>
                                <Button
                                    type={'submit'}
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                    disabled={isDisabled}
                                >
                                    Sign in
                                </Button>
                            </Stack>

                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Flex>
    );

}

export default SignIn;