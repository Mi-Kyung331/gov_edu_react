import { useState } from "react";

function InputState1() {

    // 하나밖에 없는 Input을 사용할 때
    // input이 두 개 이상이 될 때 점점 복잡해지기 때문에 여러개의 input을 담을 수 있는 코드를 짜야한다.
    // InputState2에서 설명
    const [ inputValue1, setInputValue1 ] = useState("");
    const [ output1, setOutput1 ] = useState();

    const [ inputValue2, setInputValue2 ] = useState("");
    const [ output2, setOutput2 ] = useState();

    console.log("렌더링")

    const handleOnChage1 = (e) => {
        setInputValue1(e.target.value);
    }
    const handleOnChage2 = (e) => {
        setInputValue2(e.target.value);
    }

    const handleOnClick = (e) => {
        setOutput1(inputValue1);
        setOutput2(inputValue2);
    }

    return <div>
        <h1>{output1}</h1>
        <h1>{output2}</h1>
        <input type="text" value={inputValue1} onChange={handleOnChage1} />
        <input type="text" value={inputValue2} onChange={handleOnChage2} />
        <button onClick={handleOnClick}>확인</button>
    </div>

}

export default InputState1;