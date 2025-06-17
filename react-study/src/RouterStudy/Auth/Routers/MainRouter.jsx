import React from 'react';
import RootLayout from '../RootLayout/RootLayout';
import { Route, Routes } from 'react-router-dom';
import Home from '../Home/Home';
import UnAuthRouter from './UnAuthRouter';
import AuthRouter from './AuthRouter';
import NotFound from '../NotFound/NotFound';
import RootHeader from '../RootHeader/RootHeader';

// 다 가능한 페이지
function MainRouter(props) {
    return (
        <RootLayout>
            <RootHeader />
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