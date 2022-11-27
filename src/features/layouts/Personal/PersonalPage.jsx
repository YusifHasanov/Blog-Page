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
import {Outlet, Route, Routes, useNavigate} from "react-router-dom";
import Profile from "./Profile";
import {Routing} from "../../../Routing";
import {Router} from "react-router-dom";
const PersonalPage = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const navigate=useNavigate();
    const [active, setActive] = useState(1);
    const sideBarBg = useColorModeValue('#355161', '#0D1117')
    const {login, setLogin} = useContext(ContextApi);
    const listArray = [
        {
            id: 1,
            icon: <CgProfile className={"sidebar-icon"}/>,
            text: "Profile",
            path:'/profile'
        },
        {
            id: 2,
            icon: <MdLibraryBooks className={"sidebar-icon"}/>,
            text: "My Posts",
            path: "/my-posts"
        },
        {
            id: 3,
            icon: <MdOutlineTravelExplore className={"sidebar-icon"}/>,
            text: "Explore",
                path: "/explore"
        },
        {
            id: 4,
            icon: <IoSettingsSharp className={"sidebar-icon"}/>,
            text: "Settings",
            path: "/settings"
        }

    ];
    const renderedList = listArray.map((item) => (
        <ListItem onClick={() => {
            setActive(item.id)
            Routing.goTo(navigate,item.path)
        }}
                  key={item.id}
                  className={"list-item"}
                  style={{color: active === item.id ? '#A0AEC0' : "#fff"}}>
            {item.icon} {item.text}</ListItem>
    ));

    return (
        <div className={"profile-container"}>
            <Box backgroundColor={sideBarBg} className={"profile-sidebar"}>
                <List className={"sidebar-list"}>
                 {renderedList}
                    <ListItem className={"list-item"} onClick={()=>{Routing.goTo(navigate,"/")}}></ListItem>
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
                                }} colorScheme='red'>Log Out</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </List>
            </Box>
        </div>
    );
};

export default PersonalPage;
