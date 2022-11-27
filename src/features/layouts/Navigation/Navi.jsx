import React, {ReactNode, useContext, useEffect, useState} from 'react';
import {
    Box,
    Flex,
    Avatar,
    Link,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    useColorMode,
    Center,
} from '@chakra-ui/react';
import {BsFillMoonFill, BsSun} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import {Routing} from "../../../Routing";
import ContextApi from "../../Context/ContextApi";
import {useSelector} from "react-redux";
import {selectAllUsers, selectUserById} from "../../redux/slices/UserSlice";


const NavLink = ({children}) => (
    <Link
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        href={'#'}>
        {children}
    </Link>
);

const Navi = () => {

    const {colorMode, toggleColorMode} = useColorMode();
    const {isOpen, onOpen, onClose} = useDisclosure();
    const {login, setLogin} = useContext(ContextApi);
    const navigate = useNavigate();
    const allUsers = useSelector(selectAllUsers);
    const user = allUsers.find((user) => user.id === login);

    return (
        <>
            <Box className={"navi-container"}  bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <Box cursor={"pointer"} onClick={() => {
                        Routing.goTo(navigate, '/')
                    }}>Postgram</Box>

                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={7}>
                            <Button onClick={toggleColorMode}>
                                {colorMode === 'light' ? <BsFillMoonFill/> : <BsSun/>}
                            </Button>

                            {
                                login ?
                                    <Menu>
                                        <MenuButton
                                            as={Button}
                                            rounded={'full'}
                                            variant={'link'}
                                            cursor={'pointer'}
                                            minW={0}>
                                            <Avatar
                                                size={'sm'}
                                                src={'https://avatars.dicebear.com/api/male/username.svg'}
                                            />
                                        </MenuButton>
                                        <MenuList alignItems={'center'}>
                                            <br/>
                                            <Center>
                                                <Avatar
                                                    size={'2xl'}
                                                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                                                />
                                            </Center>
                                            <br/>
                                            <Center>
                                                <p>{user?user.name:"Username"}</p>
                                            </Center>
                                            <br/>
                                            <MenuDivider/>
                                            <MenuItem onClick={()=>{Routing.goTo(navigate,"/personal")}}>Your Account</MenuItem>
                                            <MenuItem>Account Settings</MenuItem>
                                            <MenuItem onClick={() => {
                                                setLogin("")
                                            }}>Logout</MenuItem>
                                        </MenuList>
                                    </Menu>
                                    :
                                    <Button
                                        colorScheme={'facebook'}
                                        onClick={() => Routing.goTo(navigate, '/register')}
                                    >
                                        Login
                                    </Button>

                            }

                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}
export default Navi;