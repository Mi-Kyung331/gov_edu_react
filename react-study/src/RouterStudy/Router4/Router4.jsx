import React, { useEffect } from 'react';
import { Route, Routes, useParams, useSearchParams } from 'react-router-dom';

/** PathParam */
function Component1() {
    // 객체로 가져올 수 있음 > 비구조할당가능
    // :로 꺼내야한다.
    const { name } = useParams();
    console.log(name);

    return <></>
}

/** SearchParam */
function Component2() {
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const entries = searchParams.entries();
        let searchParamObj = {};
        while (true) {
            const next = entries.next();
            if(next.done) {
                break;
            } 
            const [ key, value ] = next.value;
            searchParamObj = {
                ...searchParamObj,
                [key]: value,
            }
        }
        console.log(searchParamObj);
        // getAll: 똑같은 key값으로 여러 value가 들어있으면 배열로 가지고 올 수 있도록 한다.
        console.log(searchParams.getAll("address"));
    }, [searchParams]);
    
    const handleOnClick = () => {
        setSearchParams(prev => {
            prev.set("address", "busan");
            return prev;
        });
    }
    
    return <>
        <div>
            <button onClick={handleOnClick}>주소 추가</button>
        </div>
    </>
}


function Router4(props) {

    return (
        <div>
            <Routes>
                <Route path='/param1/:name' element={<Component1 />}/>
                <Route path='/param2' element={<Component2 />}/>
            </Routes>
        </div>
    );
}

export default Router4;