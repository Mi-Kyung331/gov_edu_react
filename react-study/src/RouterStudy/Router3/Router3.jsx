import React, { useEffect } from 'react';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

/**
    경로(path) 관리
    이동기록(history) 관리
 */
function Router3(props) {
    const location = useLocation();
    const navigate = useNavigate();

    // 경로 뽑아내기
    useEffect(() => {
        console.log("경로이동!");
        console.log(location.pathname);     // 현재 경로

        // 경로 넘겨주기
        if (location.pathname === "/location/2") {
            navigate("/location/3", {
                state: {
                    name: "강미경",
                    age: 25,
                }
            });
        }
    }, [location.pathname]);

    // 경로 변경
    useEffect(() => {
        console.log("쿼리(서치)파람 변경!");
        console.log(location.search);
        console.log(decodeURI(location.search));
    }, [location.search]);

    // 경로 넘겨주기
    useEffect(() => {
        console.log(location.state);
    }, [location.state]);

    // 뒤로가기 (방문기록이 남아있어야한다.)
    // 상태까지 유지가능
    const handleBackOnClick = () => {
        navigate(-1);
    }

    return (
        <div>
            <Link to={"/location/1"}>Location1&nbsp;</Link>
            <Link to={"/location/2"}>Location2&nbsp;</Link>
            <Link to={"/location/3"}>Location3 <br /></Link>
            <Link to={"/location/3?name=강미경"}>Location3-2&nbsp;</Link>
            <Link to={"/location/3?name=강미경경"}>Location3-3<br /></Link>
            <button onClick={handleBackOnClick}>뒤로가기</button>
            <Routes>
                <Route path='/location/1' element={<h1>Location1</h1>} />
                <Route path='/location/2' element={<h1>Location2</h1>} />
                <Route path='/location/3' element={<h1>Location3</h1>} />
            </Routes>
        </div>
    );
}

export default Router3;