import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Mypage from '../Mypage/Mypage';
import NotFound from '../NotFound/NotFound';

// 로그인이 된 이후에 들어갈 수 있는 페이지
function AuthRouter(props) {
    return (
        <Routes>
            <Route path='/mypage' element={<Mypage />}/>

            <Route path='*' element={<NotFound />}/>
        </Routes>
    );
}

export default AuthRouter;