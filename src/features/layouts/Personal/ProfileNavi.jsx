import React, {useContext, useState} from 'react';
import {Box, Button, List, ListItem, useColorModeValue, useDisclosure} from "@chakra-ui/react";
import {CgProfile} from "react-icons/cg";
import {MdOutlineTravelExplore, MdLibraryBooks} from "react-icons/md";
import {IoSettingsSharp} from "react-icons/io5";
import {CiLogin} from "react-icons/ci";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'

import ContextApi from "../../Context/ContextApi";
import { useNavigate} from "react-router-dom";

import {Routing} from "../../../Routing";

const ProfileNavi = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const navigate=useNavigate();
    const [active, setActive] = useState(1);
    const sideBarBg = useColorModeValue('#355161', '#0D1117')
    const {login, setLogin} = useContext(ContextApi);



    return (
        <div className={"profile-container"}>
            <Box backgroundColor={sideBarBg} className={"profile-sidebar"}>
                <List className={"sidebar-list"}>
                    <ListItem className={"list-item"} onClick={()=>{Routing.goTo(navigate,"/personal")}}>
                        <CgProfile className={"sidebar-icon"}/>
                        Profile
                    </ListItem>
                    <ListItem  className={"list-item"} onClick={()=>{Routing.goTo(navigate,"/personal/posts")}}>
                        <MdLibraryBooks className={"sidebar-icon"}/>
                        My Posts
                    </ListItem>
                    <ListItem className={"list-item"} onClick={()=>{Routing.goTo(navigate,"/personal/explore")}}>
                        <MdOutlineTravelExplore className={"sidebar-icon"}/>
                        Explore
                    </ListItem>
                    <ListItem className={"list-item"} onClick={()=>{Routing.goTo(navigate,"/personal/settings")}}>
                        <IoSettingsSharp className={"sidebar-icon"}/>
                        Settings
                    </ListItem>
                    <ListItem style={{color:"#fff"}} className={"list-item"} onClick={onOpen}> <CiLogin className={"sidebar-icon"}/> Log
                        Out</ListItem>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay/>
                        <ModalContent>
                            <ModalHeader>Modal Title</ModalHeader>
                            <ModalCloseButton   />
                            <ModalBody>
                                Are you sure you want to log out?
                            </ModalBody>

                            <ModalFooter>
                                <Button colorScheme='green' mr={3} onClick={onClose}>
                                    Close
                                </Button>
                                <Button onClick={() => {
                                    setLogin("")
                                    Routing.goTo(navigate,"/")
                                }} colorScheme='red'>Log Out</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </List>
            </Box>
        </div>
    );
};

export default ProfileNavi;
