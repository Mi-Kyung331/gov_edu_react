import { useState } from "react";
import CountHeader from "../CountHeader/CountHeader";
import CountButton from "../CountButton/CountButton";

function CountState() {

    // const countState = useState(10);
    // const count = countState[0];
    // const setCount = countState[1];
    // 위와 같은 코드를 비구조할당으로 변환했다.
    const [ count, setCount ] = useState(10);
    // let count = 0;
    console.log("렌더링");

    const handleOnClick = (e) => {
        console.log(e);
        console.log(e.target.value);
        const num = parseInt(e.target.value);
        console.log(typeof(num));
        // countState[0] += num;
        setCount(count + num);
    }

    return <div>
        {/* <h1>{count}</h1> */}
        <CountHeader count={count} />

        <button onClick={handleOnClick} value={1}>+1</button>
        <button onClick={handleOnClick} value={-1}>-1</button>
        {/* 3개를 보내주어야 함. onClick, value, text */}
        <CountButton text={"+1"} value={1} onClick={handleOnClick}/>
        <CountButton text={"-1"} value={-1} onClick={handleOnClick}/>
    </div>

}

export default CountState;