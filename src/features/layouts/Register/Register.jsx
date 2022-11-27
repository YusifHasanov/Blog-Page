import { useColorMode, Button, } from '@chakra-ui/react';
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import {BsFillMoonFill, BsSun} from "react-icons/bs";
import React, {useContext, useState} from "react";
import {Routing} from "../../../Routing";
import {useNavigate} from "react-router-dom";

const Register = () => {
    const {colorMode, toggleColorMode} = useColorMode();
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    return (
        <div style={{paddingTop: 30}}>

            <Button position={"absolute"} background={"transparent"} left={"55px"} onClick={()=>{Routing.goBack(navigate)}}>Home Page</Button>
            <Button
                onClick={toggleColorMode} position={"absolute"} background={"transparent"} right={"55px"}>{colorMode === 'light' ?
                <BsFillMoonFill/> : <BsSun/>}</Button>
           <div style={{display:"flex",alignItems:"center",justifyContent:"center",paddingTop:40,paddingBottom:10}}>
              <Button colorScheme={isLogin?"green":"gray"} borderRadius={20} mr={4} onClick={()=>{setIsLogin(true)}}>Sign in</Button>
               <Button colorScheme={!isLogin?"green":"gray"} borderRadius={20} ml={4} onClick={()=>{setIsLogin(false)}}>Sign up</Button>
           </div>
            {
                isLogin? <SignIn/> : <SignUp/>
            }

        </div>
    );
};

export default Register;
