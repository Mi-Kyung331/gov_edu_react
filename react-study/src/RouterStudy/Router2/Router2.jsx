import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';

/**
    하위라우트(서브라우트)
 */

function Page1() {
    return <>
        <div>
            <h1>Page1</h1>
            <Routes>
                <Route path='/page1' element={<h1>페이지1입니다.</h1>} />
                <Route path='/page2' element={<Page2 />} />
            </Routes>
        </div>
    </>
}
function Page2() {
    return <>
        <div>
            <h1>Page2</h1>
        </div>
    </>
}

function Router2(props) {
    return (
        <div>
            <header>
                <Link to={"/page-study/page1"}> Page1 </Link>
                <Link to={"/page-study/page2"}> Page2 </Link>
                <Link to={"/page-study2/name1"}> name1 </Link>
                <Link to={"/page-study2/name2"}> name2 </Link>
            </header>
            <h1>Router2</h1>
            <Routes>
                {/* *은 전체를 의미한다. */}
                <Route path='/page-study/*' element={<Page1 />} />
                <Route path='/page-study2/*' element={<Routes>
                    <Route path='/name1' element={<h1>강미경</h1>} />
                    <Route path='/name2' element={<h1>강미경경</h1>} />
                </Routes>} />
            </Routes>
        </div>
    );
}

export default Router2;