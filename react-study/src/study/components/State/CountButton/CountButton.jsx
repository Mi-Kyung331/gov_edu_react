function CountButton({ text, value, onClick }) {

    // CountState와 연결
    console.log("CountButton 렌더링");

    return <button value={value} onClick={onClick}>{text}</button>

}

export default CountButton;