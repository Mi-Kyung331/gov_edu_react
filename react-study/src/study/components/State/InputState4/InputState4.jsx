import { useState } from "react";

/**
    input 3개를 만든다. (produceName,  price, stock)

    확인 버튼을 누르면 table에 추가한다.
 */

function InputState4() {

    const inputValueEmpty = {
        produceName: "",
        price: "",
        stock: "",
    }
    
    const [ products, setProducts ] = useState([]);     // 배열
    const [ inputValue, setInputValue ] = useState(inputValueEmpty);    // 객체

    // const handleOnChange = (e) => {
    //     const { name, value } = e.target;

    //     setInputValue((prev) => ({
    //             ...prev,
    //             [name]: value,
    //     }));
    // }

    const handleOnChange = (e) => {
        setInputValue({
            ...inputValue,
            [e.target.name]: e.target.value,
        });
    }

    const handleOnClick = (e) =>  {

        // setProducts((prev) => {
            //     const newArray = products;
            //     newArray.push(inputValue);
            //     return newArray;
        // });

        // 위의 코딩도 가능하지만 복잡하기 때문에 스프레드를 뿌려주는 게 편하다.
        setProducts((prev) => [...prev, inputValue]);
        setInputValue(inputValueEmpty);
        }


    return <div>
        <div>
            <label htmlFor="">상품명</label>
            <input type="text" name="produceName" value={inputValue.produceName} onChange={handleOnChange}/>
        </div>
        <div>
            <label htmlFor="">가격</label>
            <input type="text" name="price" value={inputValue.price} onChange={handleOnChange}/>
        </div>
        <div>
            <label htmlFor="">수량</label>
            <input type="text" name="stock" value={inputValue.stock} onChange={handleOnChange}/>
        </div>
        <div>
            <button onClick={handleOnClick}>확인</button>
        </div>

        <table>
            <thead>
                <tr>
                    <th>상품명</th>
                    <th>가격</th>
                    <th>수량</th>
                </tr>
            </thead>
            <tbody>
                {
                    // id와 같은 고유값이 없다면 index 넘버로 key값을 줄 수 있다.
                    // 해당 코딩은 고유값이 없기 때문에 index 넘버로 키 값을 주었다.
                    // 배열을 반복 돌리고자 하는 객체에는 무조건 key 값을 주어야 한다.
                    products.map((product, index) => (<tr key={index}>
                        <td>{product.produceName}</td>
                        <td>{product.price}</td>
                        <td>{product.stock}</td>
                    </tr>))
                }
            </tbody>
        </table>
    </div>
}

export default InputState4;
