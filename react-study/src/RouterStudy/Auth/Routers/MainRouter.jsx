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

/**
 * Stores > storeStudy 만들기
 * refresh 전역 상태 관리

    전역 상태 관리
    1. 클라이언트 전역 상태 (Zustand, recoil → react19에서 지원x)
        ↳ https://zustand-demo.pmnd.rs/
        ↳ new 터미널 > npm install zustand

    2. 서버 전역 상태 (ReactQuery)
        더욱 쉽게 할 수 있는 방법

 * props로 받아올 필요가 없어 코드가 깔끔해짐
 */

// 다 가능한 페이지
function MainRouter(props) {
    const [ isLogin, setLogin ] = useState(false);
    // const { isRefresh, refresh, reset } = useRefreshStore();
    const { value:isRefresh, setValue:setRefresh } = useRefreshStore();
    // const [ refresh, setRefresh ] = useState(true);

    // 예시
    const { name, setName, setName2 } = useGlobalStateStore();
    // 호출을 하면 name 값이 바뀐 채로 호출되어 나타날 것 이다.

    useEffect(() => {
        if (isRefresh) {
            const accessToken = localStorage.getItem("AccessToken");
    
            if (!!accessToken) {
                axios.get("http://localhost:8080/api/users/login/status", {
                    headers: {
                        Authorization: !accessToken ? null : `Bearer ${accessToken}`
                    }
                })
                .then(response => {
                    console.log(response.data);
                    if (response.data.login) {
                        setLogin(true);
                    }
                });
            } 
            // reset();
            setRefresh(prev => false);
        }
    }, [isRefresh]);

    return (
        <RootLayout>
            <RootHeader isLoign={isLogin} setLoging={setLogin} />
            <Routes>
                {/* 빈 주소일 때 Home으로 이동 */}
                <Route path='' element={<Home />} />
                
                <Route path='/auth/*' element={<AuthRouter />} />
                <Route path='/users/*' element={<UnAuthRouter />} />

                {/* 위의 주소가 아니면 NotFound가 나오돌록
                    모든 route에는 NotFound를 걸어주어야 한다 */}
                <Route path='*' element={<NotFound />} />
            </Routes>
        </RootLayout>
    );
}

export default MainRouter;