import React, { useEffect, useState } from 'react';
import RootLayout from '../RootLayout/RootLayout';
import { Route, Routes } from 'react-router-dom';
import Home from '../Home/Home';
import UnAuthRouter from './UnAuthRouter';
import AuthRouter from './AuthRouter';
import NotFound from '../NotFound/NotFound';
import RootHeader from '../RootHeader/RootHeader';
import axios from 'axios';
import { useGlobalStateStore, useRefreshStore } from '../Stores/storeStudy';
import { useQuery } from '@tanstack/react-query';


function MainRouterReactQuery(props) {

    const principalUserQuery = useQuery({
        queryKey: ["principalUserQuery"],
        queryFn: async () => {
            const accessToken = localStorage.getItem("AccessToken");
            return await axios.get("http://localhost:8080/api/users/principal", {
                headers: {
                    Authorization: !accessToken ? null : `Bearer ${accessToken}`,
                },
            });
        },  // 캐시의 데이터가 살아있는 시간
        staleTime: 1000 * 60,    // 1분
    });

    console.log(principalUserQuery.isLoading);
    console.log (principalUserQuery.data);

    return (
        <>
            {
                !principalUserQuery.isLoading &&
                <RootLayout>
                    <RootHeader />
                    <Routes>
                        <Route path='' element={<Home />} />
                
                        <Route path='/auth/*' element={<AuthRouter />} />
                        <Route path='/users/*' element={<UnAuthRouter />} />

                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </RootLayout>
            }
        </>
    );

}

export default MainRouterReactQuery;