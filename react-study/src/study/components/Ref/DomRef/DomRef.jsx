// rsf로 간편하게 만들 수 있어짐
// 다른 파일을 import를 시키려면 export가 되어있어야 한다.

// 기본값은 두개가 될 수 없기 때문에 default는 하나밖에 쓰지 못한다. 
// 때문에 하나만 정의를 할 수 있다.
// default는 중괄호를 사용하지 않는다.
// 하지만 나머지는 중괄호를 사용한다.

// document.querySelector를 사용하는 것이 아닌 react에서는 ref를 사용한다.
import React, { useEffect, useRef, useState } from 'react';
import * as f from '../ImportStudy/functions';
// * as - 모든 export된 값을 들고올 때 사용
//     f.default(); 로 불러올 수 있다.



function DomRef(props) {

    const [ name, setName ] = useState();
    const inputRef = useRef();

    // 마운트, 언마운트 관리
    // 렌더링이 일어나면 부품이 완성되고 그것을 장착할 때 실행될 때 사용하는 함수
    // useEffect는 return되고 나서 useEffect가 실행된다.
    // 최초 한 번은 무조건 실행된다.
    // 빈 배열일 때(=[ ]) 첫 실행 때 한 번만 사용된다. → 자주 사용
    // 안에 배열이 있을 때엔 그 배열이 실행될 때 마다 사용된다.
    // 배열이 없을 때엔 계속해서 실행이 된다.
    // 3. 실행
    useEffect(() => {
        console.log("마운트(장착)");
        console.log(inputRef.current.value);
        // 화면에서 사라질 때 실행된다.
        return () => {
            console.log("언마운트(해제)");
        }
    })
    // 1. 등록 (return이 일어나지 않았기 때문)
    console.log("렌더링2");

    // 2. 실행
    return (
        <div>
            <input type="text" ref={inputRef} value={"abc"} />
        </div>
    );
}

export default DomRef;