// Route

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';

const layout = css`
    width: 1200px;
    height: 800px;
`;

const header = css`
    width: 100%;
    height: 100px;
    background-color: yellow;

`;

const main = (color) => css`
    width: 100%;
    height: 600px;
    background-color: ${color};
`;

const footer = css`
    width: 100%;
    height: 100px;
    background-color: green;
`;

function Router1(props) {

    const navigate = useNavigate();
    const [ data, setData ] = useState(0);

    return (
        <>
            <div css={layout}>
                <header css={header}>
                    {/* 새로고침 */}
                    {/* 모든 데이터가 다 날아간다. */}
                    {/* 숫자가 유지가 되지 않음 */}
                    <a href={"/color/red"}>RED&nbsp;</a>
                    <a href={"/color/blue"}>BLUE&nbsp;</a>
                    <a href={"/color/purple"}>PURPLE<br /></a>

                    {/* 부분렌더링 - 상태값을 가지고 페이지 전환(상태유지) */}
                    {/* 즉, route부분만 다시 호출이 일어난다. */}
                    {/* 숫자가 유지가 됨 */}
                    <Link to={"/color/red"}>RED&nbsp;</Link>
                    <Link to={"/color/blue"}>BLUE&nbsp;</Link>
                    <Link to={"/color/purple"}>PURPLE</Link>

                    <div></div>
                    {/* 마찬가지로 상태유지가 가능하다 */}
                    <button onClick={() => navigate("/color/red")}>RED</button>
                    <button onClick={() => navigate("/color/blue")}>BLUE</button>
                    <button onClick={() => navigate("/color/purple")}>PURPLE</button>

                    <div>
                        <h1>{data}</h1>
                        <button onClick={() => {setData(prev => prev + 1)}}>+1</button>
                    </div>
                </header>
                <Routes>
                    <Route path='/color/red' element={<main css={main("red")}></main>} />
                    <Route path='/color/blue' element={<main css={main("blue")}></main>} />
                    <Route path='/color/purple' element={<main css={main("purple")}></main>} />
                </Routes>
                <footer css={footer}></footer>
            </div>
        </>
    );
}

export default Router1;