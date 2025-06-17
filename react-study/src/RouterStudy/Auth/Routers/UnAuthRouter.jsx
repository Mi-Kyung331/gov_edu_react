import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Signin from '../Signin/Signin';
import Signup from '../Signup/Signup';
import NotFound from '../NotFound/NotFound';

// 로그인이 된 이후에는 들어갈 수 없는 페이지
function UnAuthRouter(props) {
    return (
        <Routes>
            <Route path='/signin' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />

            <Route path='*' element={<NotFound />} />
        </Routes>
    );
}

export default UnAuthRouter;