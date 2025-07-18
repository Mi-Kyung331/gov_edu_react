import { useState } from "react";

function Calculator() {

    // 계산기 만들기
    const [ result, setResult ] = useState(0);
    const [ input, setInput ] = useState("0");

    const getResult = () => {

        // eval를 사용하지 않으면 써야하는 코드
        // 너무 길어짐
        let inputText = input;
        let plusNums = [];
        let minusNums = [];
        let lastCalc = "";

        const plusIndex = inputText.indexOf("+");
        const minusIndex = inputText.indexOf("-");
        if (plusIndex == -1 && minusIndex === -1) {
            // +도 -도 없는 상태
            return;
        }
        
        if (plusIndex < 0) {
            const numtext = inputText.substring(0, minusIndex);
            const restNumText = inputText.substring(minusIndex + 1);
            console.log(numtext);
            console.log(restNumText);
        }

        if (minusIndex < 0) {
            const numtext = inputText.substring(0, plusIndex);
            const restNumText = inputText.substring(plusIndex + 1);
            console.log(numtext);
            console.log(restNumText);
        }

        if (plusIndex < minusIndex) {
            const numtext = inputText.substring(0, plusIndex);
            const restNumText = inputText.substring(plusIndex + 1);
        } else {
            const numtext = inputText.substring(0, minusIndex);
            const restNumText = inputText.substring(minusIndex + 1);
        }

    }


    
    const handleOnClick = (e) => {

        if (e.target.value === "=") {
            // getResult();
            setResult(eval(input));
            // 문자열로 된 자바스크립트 코드를 실행하는 함수
            setInput("0");
            return;
        }
        if (input === "0") {
            setInput(e.target.value)
        } else {
            setInput(input + e.target.value)
        }
    }

    // 내가 만든 코드 (계산은 되지 않음)
    // const handleOnClick = (e) => {
    //     const num = parseInt(e.target.value);
    //     console.log(typeof(num));
    //     setInput(input + num);
    // }

    // const handleCalOnClick = (e) => {
    //     const cal = (e.target.value);
    //     setInput(input + cal);
    // }

    return <div>
        <h1>입력: {input}</h1>
        <h1>결과: {result}</h1>

        <div>
            <button onClick={handleOnClick} value={0}>0</button>
        </div>
        <div>
            <button onClick={handleOnClick} value={1}>1</button>
            <button onClick={handleOnClick} value={2}>2</button>
            <button onClick={handleOnClick} value={3}>3</button>
        </div> 
        <div>
            <button onClick={handleOnClick} value={4}>4</button>
            <button onClick={handleOnClick} value={5}>5</button>    
            <button onClick={handleOnClick} value={6}>6</button>
        </div>
        <div>
            <button onClick={handleOnClick} value={7}>7</button>
            <button onClick={handleOnClick} value={8}>8</button>    
            <button onClick={handleOnClick} value={9}>9</button>
        </div>
        <div>
            <button onClick={handleOnClick} value={"+"}>+</button>
            <button onClick={handleOnClick} value={"-"}>-</button>
            <button onClick={handleOnClick} value={"="}>=</button>
            {/* <button onClick={handleCalOnClick} value={"+"}>+</button>
            <button onClick={handleCalOnClick} value={"-"}>-</button>
            <button onClick={handleCalOnClick} value={"="}>=</button> */}
        </div>
    </div>

}


export default Calculator;