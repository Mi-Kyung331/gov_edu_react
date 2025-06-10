import { useState } from "react";

function InputState2() {
    
    // 여러개의 input 담기
    // 복잡한 것을 간단하게 표현하기 위해 사용
    const [ inputValue, setInputValue ] = useState({
        t1: "",
        t2: "",
        t3: "",
    });

    const handleOnChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        console.log(`name: ${name}, value: ${value}`);

        const newInputValue = {
            ...inputValue,
            [name]: value,
        }

        setInputValue(newInputValue);




        const addr = "address";
        const address = "부산 금정구";
        const obj = {
            name: "강미경",
            age: 25,
            [addr]: address,
            // key값은 [], value값은 값이라 그냥 변수를 넣으면 된다.
            address: "부산 부산진구",
        }

        // 얕은 복사 (주소만 복사)
        const obj2 = obj;
        // 깊은 복사 (내부의 모든 값(객체 포함))
        const obj3 = {
            // name: obj.name,
            // age: obj.age,
            // address: obj.address,
            // 스프레드
            ...obj,
            address: "부산 북구",
        };
    }



    return <div>
        <input type="text" name="t1" value={inputValue.t1} onChange={handleOnChange} />
        <input type="text" name="t2" value={inputValue.t2} onChange={handleOnChange} />
        <input type="text" name="t3" value={inputValue.t3} onChange={handleOnChange} />

        <input type="text" value={inputValue.t1} onChange={(e) => {console.log(e)}} />
        <input type="text" value={inputValue.t2} onChange={(e) => {console.log(e)}} />
        <input type="text" value={inputValue.t3} onChange={(e) => {console.log(e)}} />
    </div>
}

export default InputState2;