import React, {createContext, useEffect} from 'react';
import useLocalStorage from "../features/customHooks/UseLocalStorage";
import Navi from "../features/layouts/Navigation/Navi";
import GetStarted from "../features/layouts/Home/GetStarted";
import {Outlet, Route, Routes, useNavigate} from "react-router-dom";
import Register from "../features/layouts/Register/Register";
import ContextApi from '../features/Context/ContextApi';
import PersonalPage from "../features/layouts/Personal/PersonalPage";

import {useColorModeValue} from "@chakra-ui/react";
import ProfileNavi from "../features/layouts/Personal/ProfileNavi";
import Profile from "../features/layouts/Personal/Profile";
import Posts from "../features/layouts/Personal/Posts";
import Explore from "../features/layouts/Personal/Explore";
import Settings from "../features/layouts/Personal/Settings";


const App = () => {
    const [login, setLogin] = useLocalStorage("login", "");

    return (
        <div  className="App">

            <ContextApi.Provider value={{login, setLogin}}>
                <Routes>
                    <Route path={'/'} element={
                        <>
                            <Navi/>
                            <GetStarted/>
                        </>
                    }/>
                    {
                        login ?
                            <>
                                <Route path="personal" element={<Outlet />}>
                                    <Route path="" element={<Profile/>} />
                                    <Route path="posts" element={ <Posts/>} />
                                    <Route path="explore" element={ <Explore/>} />
                                    <Route path="settings" element={ <Settings/>} />
                                </Route>
                            </>: <Route path={'/personal/*'} element={<>Access Denied</>}/>
                    }

                    <Route path={'/register'} element={<Register/>}/>
                    <Route path={"*"} element={<>404</>}/>
                </Routes>
            </ContextApi.Provider>
        </div>
    );
}
export default App;
